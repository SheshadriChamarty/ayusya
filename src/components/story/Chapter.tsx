import { ReactNode, forwardRef } from "react";
import GoldenThread from "./GoldenThread";
import { cn } from "@/lib/utils";

interface ChapterProps {
  /** Slug — used as the section id, the thread segment key and the anchor target. */
  id: string;
  /** Roman numeral shown in the chapter mark, e.g. "I". */
  numeral: string;
  /** Short chapter name shown beside the numeral. */
  eyebrow: string;
  children: ReactNode;
  className?: string;
  /** Tailwind background for this chapter's ground. Defaults to the cream page. */
  tone?: string;
}

/**
 * One chapter of the scroll narrative.
 *
 * The chapter owns its own thread segment rather than a page-level thread layer
 * owning all of them, which is what keeps the line locked to the content: the
 * segment stretches to whatever height the chapter's text actually occupies, so
 * a wrapped headline on a narrow screen moves the line with it instead of
 * leaving it floating over the wrong paragraph.
 *
 * Content sits in the right two-thirds on desktop so the thread has a lane of
 * its own on the left. On mobile the thread runs behind the text at low opacity —
 * a 390px screen has no room for a dedicated gutter, and the alternative (hiding
 * the thread on mobile) would remove the guiding line for most visitors.
 */
const Chapter = forwardRef<HTMLElement, ChapterProps>(
  ({ id, numeral, eyebrow, children, className, tone }, ref) => (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-eyebrow`}
      /* overflow-x-clip, not overflow-hidden: `hidden` makes the section a scroll
         container, and a sticky child then binds to that container instead of the
         viewport — which silently broke the pinned tunnel in chapter ④. `clip`
         still crops the decorations that bleed past the edge, but creates no
         scroll container, so sticky keeps working. */
      className={cn("relative overflow-x-clip", tone ?? "bg-background", className)}
    >
      {/* The thread gets its own lane so it never crosses the copy: a narrow
          strip at the left edge on mobile, widening to the empty gutter beside
          the indented content on desktop. */}
      <GoldenThread id={id} className="w-[14%] opacity-40 md:w-[20%] md:opacity-100" />

      <div className="container relative z-10 mx-auto px-5 py-24 md:px-8 md:py-32">
        <div className="md:pl-[18%] lg:pl-[22%]">
          <p id={`${id}-eyebrow`} className="eyebrow mb-6 flex items-center gap-3">
            <span className="bronze-seal h-8 w-8 font-display text-[0.7rem]">
              {numeral}
            </span>
            {eyebrow}
          </p>
          {children}
        </div>
      </div>
    </section>
  )
);

Chapter.displayName = "Chapter";

export default Chapter;
