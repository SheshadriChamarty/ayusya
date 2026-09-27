/**
 * The Golden Thread — one continuous line running the length of the homepage.
 *
 * Geometry note: rather than one path spanning the whole document, each chapter
 * owns a segment drawn in a normalised 0–100 × 0–100 box that is stretched to
 * that section's real height. Continuity comes from arithmetic, not layout —
 * every segment starts at y=0 and ends at y=100, and each chapter's exit x is
 * the next chapter's entry x, so the seams are invisible at any page height and
 * survive any reflow. A single document-length path would instead need its
 * control points recomputed on every resize, font swap and text wrap.
 *
 * `meaning` records what the line *is* in that chapter. It is the whole point of
 * using one element throughout: the thread never breaks, it only changes job.
 */

export interface ThreadSegment {
  /** Chapter slug, matching the section id. */
  id: string;
  /** Normalised path, 0–100 in both axes, from y=0 to y=100. */
  d: string;
  /** What the line represents here — documentation, not rendered. */
  meaning: string;
  /** Stroke colour for this stretch. Shifts warm as the story resolves. */
  stroke: string;
  /** Dash gap in px. Only chapter ② frays; everywhere else the line is solid. */
  frayed?: boolean;
}

export const THREAD: ThreadSegment[] = [
  {
    id: "wish",
    d: "M50 0 C50 24 36 38 34 58 C32 78 30 86 30 100",
    meaning: "A sewing thread trailing from a needle",
    stroke: "#B8865C",
  },
  {
    id: "loss",
    d: "M30 0 C30 22 44 30 50 46 C58 66 66 78 72 100",
    meaning: "The thread frays — what is grown and then lost",
    stroke: "#7A6650",
    frayed: true,
  },
  {
    id: "farm",
    d: "M72 0 C72 26 44 30 34 50 C26 68 23 84 22 100",
    meaning: "A furrow across a field; seedlings rise off it",
    stroke: "#4E732A",
  },
  {
    id: "sun",
    d: "M22 0 C22 26 34 36 44 52 C54 68 60 84 62 100",
    meaning: "A ray arcing from the sun into the solar tunnel",
    stroke: "#AD8A61",
  },
  {
    id: "seal",
    d: "M62 0 C62 26 52 38 51 58 C50 78 50 88 50 100",
    meaning: "The zipper line closing across the pouch",
    stroke: "#451B03",
  },
  {
    id: "kitchen",
    d: "M50 0 C42 18 58 32 50 50 C42 68 58 82 50 100",
    meaning: "Steam loosening off a cup",
    stroke: "#D19F75",
  },
  {
    id: "shelf",
    d: "M50 0 C50 30 50 48 50 66 C50 76 50 82 50 100",
    meaning: "A shelf rule the products sit on",
    stroke: "#AD8A61",
  },
];

/** Look-up by chapter id, so a chapter file names its segment rather than indexing. */
export const threadFor = (id: string): ThreadSegment | undefined =>
  THREAD.find((s) => s.id === id);
