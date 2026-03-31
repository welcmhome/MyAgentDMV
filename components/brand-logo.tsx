import Image from "next/image";

type BrandLogoProps = {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function BrandLogo({
  src = "/ADMV_LOGO.png",
  alt = "Agent DMV logo",
  size = 28,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 96px, 192px",
}: BrandLogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      sizes={sizes}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
