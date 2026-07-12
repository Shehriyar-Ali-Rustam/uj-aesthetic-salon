/**
 * Next prefixes its own bundle and next/link + next/image with `basePath`, but
 * it cannot rewrite URLs we write by hand. Any hand-written path to something in
 * public/ (the clips, the posters) must go through here, or it will 404 when the
 * site is served from a subpath such as GitHub Pages.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
