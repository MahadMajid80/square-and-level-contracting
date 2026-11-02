import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
};

/** Headline whose lines rise from a mask in sequence. Readable as normal text without JS. */
export function SplitLines({ lines, as: Tag = "h2", className, delay = 0, id }: Props) {
  return (
    <Tag
      className={className}
      data-split=""
      id={id}
      style={{ "--reveal-delay": delay } as CSSProperties}
    >
      {lines.map((line, i) => (
        <span key={i} className="split-line">
          <span style={{ "--i": i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
