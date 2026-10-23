import images from "@/lib/images.json";

// Plain <img> with a pre-generated WebP srcset (see scripts/optimize-images.py).
export default function Photo({ name, sizes = "100vw", priority = false, className, alt, style }) {
  const img = images[name];
  if (!img) return null;
  const largest = img.variants[img.variants.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      style={style}
      src={largest.src}
      srcSet={img.variants.map((v) => `${v.src} ${v.w}w`).join(", ")}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt ?? img.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
    />
  );
}
