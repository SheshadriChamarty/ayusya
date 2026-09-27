import { FileText } from "lucide-react";
import { CATALOGUE_PATH } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface CatalogueLinkProps {
  /** Visual weight. "outline" is the default; "quiet" is a plain inline link. */
  variant?: "outline" | "quiet";
  label?: string;
  className?: string;
}

/**
 * Link to the product catalogue PDF.
 *
 * The file is ~15MB, so it deliberately opens in a new tab rather than being
 * force-downloaded: the browser's PDF viewer streams the first page while the
 * rest arrives, whereas a download attribute commits the visitor to the whole
 * file before they see anything. `rel="noreferrer noopener"` because the tab is
 * a different top-level document.
 */
const CatalogueLink = ({
  variant = "outline",
  label = "View Catalogue",
  className,
}: CatalogueLinkProps) => (
  <a
    href={CATALOGUE_PATH}
    target="_blank"
    rel="noreferrer noopener"
    className={cn(
      variant === "outline"
        ? "ayusya-btn-outline"
        : "inline-flex items-center gap-2 font-display text-sm font-semibold text-primary underline-offset-4 hover:underline",
      className
    )}
  >
    <FileText size={variant === "outline" ? 20 : 16} aria-hidden="true" />
    <span>{label}</span>
    <span className="sr-only"> (PDF, opens in a new tab)</span>
  </a>
);

export default CatalogueLink;
