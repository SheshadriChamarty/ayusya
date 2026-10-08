import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { useStoryScroll, useDrawnPath, STORY_OFFSETS } from "@/hooks/useStoryScroll";
import { threadFor, type ThreadSegment } from "./threadPaths";
import { cn } from "@/lib/utils";

interface GoldenThreadProps {
  /** Chapter id — selects the segment from threadPaths. */
  id: string;
  className?: string;
}

/**
 * One stretch of the Golden Thread, scoped to its chapter — grown as a creeper.
 *
 * The stem draws as the chapter scrolls, and leaves unfurl off it the moment the
 * growing tip passes them, so the reader watches a vine climb down the page
 * rather than a line being ruled.
 *
 * ── Why the SVG is measured rather than stretched ───────────────────────────
 *
 * The thread used to draw in a 100×100 viewBox stretched with
 * `preserveAspectRatio="none"`, with `vector-effect: non-scaling-stroke` to stop
 * the stroke distorting. Chrome computes the dash pattern for a `pathLength`
 * path in user space but strokes it in screen space under non-scaling-stroke, so
 * on a tall chapter `strokeDasharray: 1` stopped meaning "the whole path" and
 * the line rendered as a row of dashes with gaps between them. The same stretch
 * would also squash every leaf into a sliver.
 *
 * So the lane is measured with a ResizeObserver and the normalised path is
 * scaled into real pixels. Nothing is distorted, `pathLength="1"` means what it
 * says, and leaves can be placed with `getPointAtLength` in true coordinates.
 * Continuity across chapters still comes from threadPaths' arithmetic: every
 * segment enters at the previous one's exit x, scaled by the same lane width.
 *
 * Only `strokeDashoffset` and per-leaf `scale` animate — never layout — so the
 * browser keeps this off the layout path and mobile scroll stays smooth.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Stem length between leaf nodes, in px. Close enough to read as foliage,
 *  sparse enough that the line itself stays visible between leaves. */
const NODE_SPACING = 64;

/** Keep leaves off the first and last stretch of each segment: a leaf at the
 *  seam would be painted over by the next chapter's background. */
const SEAM_CLEARANCE = 28;

/** How far past a leaf the tip travels while that leaf unfurls, as a fraction of
 *  the segment. Small, so a leaf opens just behind the tip, not long after it. */
const UNFURL_SPAN = 0.06;

const GREEN = { fills: ["#4E732A", "#5F8534", "#739A43"], vein: "#34501A" };
const DRY = { fills: ["#C9A27A", "#B8865C", "#A87F57"], vein: "#6E4E30" };

interface Node {
  key: number;
  x: number;
  y: number;
  /** Degrees. Already includes the outward lean away from the stem. */
  angle: number;
  /** Leaf length in px. */
  size: number;
  /** 0–1 position along the stem; the tip reaching it is what opens the leaf. */
  at: number;
  kind: "leaf" | "tendril";
  fill: string;
  /** Sway phase offset, so leaves do not all move in step. */
  delay: number;
}

/** Deterministic noise, so a resize re-places leaves exactly where they were
 *  instead of reshuffling the whole vine. */
const noise = (n: number, seed: number) => {
  const v = Math.sin(n * 12.9898 + seed * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

const seedOf = (id: string) => [...id].reduce((s, c) => s + c.charCodeAt(0), 0);

/** Scale a normalised 0–100 path into a w×h box. Every command in threadPaths
 *  is M or C with absolute coordinate pairs, so mapping pairs is sufficient. */
const scalePath = (d: string, w: number, h: number) =>
  d.replace(/(-?\d*\.?\d+)[\s,]+(-?\d*\.?\d+)/g, (_, x, y) =>
    `${((+x * w) / 100).toFixed(1)} ${((+y * h) / 100).toFixed(1)}`
  );

/** A leaf pointing along +x from its base at the origin, `s` px long. */
const leafBlade = (s: number) =>
  `M${s * 0.16} 0 C${s * 0.34} ${-s * 0.34} ${s * 0.8} ${-s * 0.38} ${s} 0 ` +
  `C${s * 0.8} ${s * 0.38} ${s * 0.34} ${s * 0.34} ${s * 0.16} 0 Z`;

/** A loose spiral curling off the stem — the creeper's grip. */
const tendrilCurl = (s: number) =>
  `M0 0 C${s * 0.45} ${-s * 0.12} ${s * 0.78} ${s * 0.2} ${s * 0.66} ${s * 0.46} ` +
  `C${s * 0.56} ${s * 0.66} ${s * 0.3} ${s * 0.58} ${s * 0.36} ${s * 0.4}`;

const buildNodes = (path: SVGPathElement, segment: ThreadSegment, laneWidth: number): Node[] => {
  const total = path.getTotalLength();
  if (total < SEAM_CLEARANCE * 3) return [];

  const seed = seedOf(segment.id);
  const palette = segment.withered ? DRY : GREEN;
  // Scales with the lane, so the 55px mobile strip gets small leaves rather
  // than ones that swallow the stem.
  const base = Math.min(22, Math.max(10, laneWidth * 0.08));
  const nodes: Node[] = [];

  for (let i = 0; ; i++) {
    const along = SEAM_CLEARANCE + i * NODE_SPACING + (noise(i, seed) - 0.5) * 18;
    if (along > total - SEAM_CLEARANCE) break;

    const p = path.getPointAtLength(along);
    const q = path.getPointAtLength(Math.min(along + 1, total));
    const tangent = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
    // Alternate sides like a real vine; lean 60–90° off the stem, and further for
    // withered leaves, which hang rather than reach.
    const side = i % 2 === 0 ? 1 : -1;
    const lean = (segment.withered ? 95 : 60) + noise(i + 101, seed) * 30;

    nodes.push({
      key: i * 2,
      x: p.x,
      y: p.y,
      angle: tangent + side * lean,
      size: base * (0.8 + noise(i + 53, seed) * 0.45),
      at: along / total,
      kind: "leaf",
      fill: palette.fills[Math.floor(noise(i + 7, seed) * palette.fills.length)],
      delay: noise(i + 211, seed) * -7,
    });

    // Every few nodes, a tendril on the opposite side. Not on withered stretches:
    // a vine that is losing its leaves is not reaching for anything.
    if (!segment.withered && i % 3 === 1) {
      nodes.push({
        key: i * 2 + 1,
        x: p.x,
        y: p.y,
        angle: tangent - side * (50 + noise(i + 307, seed) * 25),
        size: base * 1.1,
        at: along / total,
        kind: "tendril",
        fill: segment.stroke,
        delay: 0,
      });
    }
  }

  return nodes;
};

/** One leaf or tendril, opening as the drawn stem reaches it. */
const Sprout = ({
  node,
  drawn,
  vein,
  reduced,
}: {
  node: Node;
  drawn: MotionValue<number>;
  vein: string;
  reduced: boolean;
}) => {
  const open = useTransform(
    drawn,
    [node.at, node.at + UNFURL_SPAN],
    reduced ? [1, 1] : [0, 1]
  );
  const unwound = useTransform(open, (o) => 1 - o);

  return (
    <g transform={`translate(${node.x.toFixed(1)} ${node.y.toFixed(1)}) rotate(${node.angle.toFixed(1)})`}>
      {node.kind === "tendril" ? (
        <motion.path
          d={tendrilCurl(node.size)}
          stroke={node.fill}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          pathLength="1"
          style={{ strokeDasharray: 1, strokeDashoffset: unwound }}
        />
      ) : (
        <motion.g style={{ scale: open, originX: 0, originY: 0.5 }}>
          {/* Idle sway lives on its own group so it composes with the unfurl
              scale instead of fighting it for the transform property. */}
          <g
            className="animate-sway"
            style={{
              transformBox: "fill-box",
              transformOrigin: "0% 50%",
              animationDelay: `${node.delay.toFixed(2)}s`,
            }}
          >
            <path d={`M0 0 L${node.size * 0.2} 0`} stroke={vein} strokeWidth="1.1" strokeLinecap="round" />
            <path d={leafBlade(node.size)} fill={node.fill} stroke={vein} strokeWidth="0.6" strokeLinejoin="round" />
            <path
              d={`M${node.size * 0.2} 0 L${node.size * 0.9} 0`}
              stroke={vein}
              strokeWidth="0.6"
              strokeLinecap="round"
              opacity="0.55"
            />
          </g>
        </motion.g>
      )}
    </g>
  );
};

/** The flower the vine ends in — the wish, come to life. */
const Bloom = ({ x, y, drawn, reduced }: { x: number; y: number; drawn: MotionValue<number>; reduced: boolean }) => {
  const open = useTransform(drawn, [0.9, 1], reduced ? [1, 1] : [0, 1]);
  const turn = useTransform(open, [0, 1], reduced ? [0, 0] : [-40, 0]);

  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <motion.g style={{ scale: open, rotate: turn }}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-7"
            rx="4.6"
            ry="7"
            transform={`rotate(${a})`}
            fill="#F7D89A"
            stroke="#B8865C"
            strokeWidth="0.8"
          />
        ))}
        <circle r="3.6" fill="#AD8A61" stroke="#451B03" strokeWidth="0.8" />
      </motion.g>
    </g>
  );
};

const GoldenThread = ({ id, className }: GoldenThreadProps) => {
  const wrap = useRef<HTMLDivElement>(null);
  const measure = useRef<SVGPathElement>(null);
  const tip = useRef<SVGGElement>(null);
  const segment = threadFor(id);

  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);

  // Completes while the section is still on screen, so a segment finishes
  // growing in front of the reader rather than as it leaves the viewport.
  const { progress, reduced } = useStoryScroll(wrap, STORY_OFFSETS.draw);
  const dashOffset = useDrawnPath(progress, reduced);
  const drawn = useTransform(dashOffset, (o) => 1 - o);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      // Rounded, so sub-pixel jitter during reveal animations does not
      // re-place every leaf on every frame.
      const w = Math.round(entry.contentRect.width);
      const h = Math.round(entry.contentRect.height);
      setSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const d = useMemo(
    () => (segment && size && size.w > 0 && size.h > 0 ? scalePath(segment.d, size.w, size.h) : ""),
    [segment, size]
  );

  // Measured from the ghost path, which carries no pathLength: browsers disagree
  // on whether pathLength rescales getPointAtLength, so we avoid the question.
  useLayoutEffect(() => {
    const path = measure.current;
    if (!path || !d || !segment || !size) return;
    setNodes(buildNodes(path, segment, size.w));
    const total = path.getTotalLength();
    const last = path.getPointAtLength(total);
    setEnd(segment.bloom ? { x: last.x, y: last.y } : null);
  }, [d, segment, size]);

  /* The growing tip: a bud that rides the head of the drawn stem. Positioned by
     writing the transform attribute directly, so following the scroll never
     costs a React render. */
  const placeTip = (fraction: number) => {
    const path = measure.current;
    const bud = tip.current;
    if (!path || !bud || !d) return;
    const visible = !reduced && fraction > 0.005 && fraction < 0.995;
    bud.style.opacity = visible ? "1" : "0";
    if (!visible) return;
    const total = path.getTotalLength();
    const p = path.getPointAtLength(fraction * total);
    const q = path.getPointAtLength(Math.min(fraction * total + 1, total));
    const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
    bud.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
  };

  useMotionValueEvent(drawn, "change", placeTip);
  useLayoutEffect(() => placeTip(drawn.get()));

  if (!segment) return null;
  const vein = segment.withered ? DRY.vein : GREEN.vein;

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-y-0 left-0", className)}
    >
      {size && d && (
        <svg
          className="h-full w-full overflow-visible"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
        >
          {/* Ghost of the full path, so the eye has somewhere to travel to — the
              vine reads as a route being followed, not one appearing from nowhere.
              It is also the path every leaf position is measured from. */}
          <path
            ref={measure}
            d={d}
            stroke={segment.stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.14"
          />
          <motion.path
            d={d}
            stroke={segment.stroke}
            strokeWidth="2.25"
            strokeLinecap="round"
            pathLength="1"
            style={{ strokeDasharray: 1, strokeDashoffset: dashOffset }}
          />
          {nodes.map((node) => (
            <Sprout key={node.key} node={node} drawn={drawn} vein={vein} reduced={reduced} />
          ))}
          {end && <Bloom x={end.x} y={end.y} drawn={drawn} reduced={reduced} />}
          <g ref={tip} style={{ opacity: 0, transition: "opacity 200ms" }}>
            <path d="M0 0 C3 -4 8 -4 10 0 C8 4 3 4 0 0 Z" fill={GREEN.fills[2]} stroke={GREEN.vein} strokeWidth="0.6" />
            <circle r="2.6" fill={segment.stroke} />
          </g>
        </svg>
      )}
    </div>
  );
};

export default GoldenThread;
