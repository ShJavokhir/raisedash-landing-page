import { useState } from "react";
import { Shot } from "./Shot";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { figuresCopy } from "@/i18n/figures";

/**
 * The three weekly boards, as the PNGs the service actually renders and pins in
 * the group. These are real exports from a live fleet — every driver name and
 * the carrier name are destroyed in the file itself, not hidden with CSS. Tab
 * labels, alt texts and notes live in src/i18n/figures.ts (English + Uzbek).
 */

const BOARDS = [
  {
    key: "safety",
    src: "/images/samsara/board-weekly-safety.webp",
    width: 1200,
    height: 1188,
  },
  {
    key: "driver",
    src: "/images/samsara/board-driver-safety.webp",
    width: 1200,
    height: 1204,
  },
  {
    key: "fuel",
    src: "/images/samsara/board-fuel-efficiency.webp",
    width: 1200,
    height: 1226,
  },
] as const;

export function BoardTabs() {
  const t = useCopy(figuresCopy).samsaraBoards;
  const [active, setActive] = useState(0);
  const board = BOARDS[active];

  return (
    <div>
      <div role="tablist" aria-label={t.label} className="mb-5 flex flex-wrap justify-center gap-2">
        {BOARDS.map((b, i) => (
          <button
            key={b.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`board-${b.key}`}
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-[0.15s] ${
              i === active
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
            }`}
          >
            {t[b.key].tab}
          </button>
        ))}
      </div>

      <div id={`board-${board.key}`} role="tabpanel" className="mx-auto max-w-[900px]">
        <Shot
          src={board.src}
          alt={t[board.key].alt}
          width={board.width}
          height={board.height}
          sizes="(max-width: 900px) 100vw, 900px"
        />
        <p className="text-muted-foreground mt-4 text-center text-sm leading-relaxed">
          {t[board.key].note}
        </p>
      </div>
    </div>
  );
}
