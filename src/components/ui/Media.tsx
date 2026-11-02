import Image from "next/image";
import { media } from "@/lib/images";

type Props = {
  src: string; // WordPress media path
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  quality?: number;
};

/**
 * Fill-mode image inside a sized frame. The parent sets the aspect ratio, so space is reserved
 * before the image loads (no layout shift). A dark fallback shows if a file is ever unavailable.
 */
export function Media({
  src,
  alt,
  sizes,
  priority,
  className = "",
  imgClassName = "",
  quality = 72,
}: Props) {
  return (
    <div className={`media-fallback relative overflow-hidden ${className}`}>
      <Image
        src={media(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
