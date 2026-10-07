/**
 * Appends Cloudinary auto-format and quality transformations to a URL.
 * Converts: https://res.cloudinary.com/.../image.jpg
 * To:      https://res.cloudinary.com/.../image.jpg?f_auto,q_auto,w_<width>
 *
 * Safe for both Client Components and Server Components (zero Node.js dependencies).
 * Only transforms Cloudinary URLs; returns other URLs unchanged.
 */
export function optimizeCloudinaryUrl(
  url: string,
  options?: { width?: number; quality?: number }
): string {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) return url;

  // Clean any legacy invalid query parameters
  const cleanedUrl = url
    .replace(/([?&])f_auto=[^&]*(&|$)/g, "$1")
    .replace(/([?&])q_auto=[^&]*(&|$)/g, "$1")
    .replace(/([?&])w=\d+(&|$)/g, "$1")
    .replace(/[?&]$/, "");

  if (cleanedUrl.includes("/image/upload/")) {
    const transforms: string[] = ["f_auto"];
    if (options?.quality) {
      transforms.push(`q_${options.quality}`);
    } else {
      transforms.push("q_auto");
    }
    if (options?.width) {
      transforms.push(`w_${options.width}`);
    }
    const transformStr = transforms.join(",");

    if (cleanedUrl.includes(`/image/upload/${transformStr}/`)) {
      return cleanedUrl;
    }

    const existingTransformRegex = /\/image\/upload\/(f_auto[^/]*\/)?/;
    return cleanedUrl.replace(existingTransformRegex, `/image/upload/${transformStr}/`);
  }

  return cleanedUrl;
}
