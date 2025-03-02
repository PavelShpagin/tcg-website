const normalizeSrc = (src: string) => {
    return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
    src,
    width,
    quality,
}: { src: string; width: number; quality?: number }) {
    if (process.env.NODE_ENV === "development") {
        return src;
    }
    const params = [`width=${width}`];
    if (quality) {
        params.push(`quality=${quality}`);
    }
    const paramsString = params.join(",");
    return `${process.env.NEXT_PUBLIC_BASE_URL}/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}