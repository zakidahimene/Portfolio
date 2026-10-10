// Prefix a root-relative path with the site's base (e.g. /Portfolio on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (path: string) => `${base}${path}`;
