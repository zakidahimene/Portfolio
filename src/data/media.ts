import raw from './media.json';
import { u } from '../lib/url';

type Entry = { src: string; sm: string; w: number; h: number };

// media.json stores root-relative paths; add the site base here once.
const media = Object.fromEntries(
  Object.entries(raw).map(([slug, items]) => [
    slug,
    Object.fromEntries(
      Object.entries(items as Record<string, Entry>).map(([k, v]) => [k, { ...v, src: u(v.src), sm: u(v.sm) }]),
    ),
  ]),
) as unknown as typeof raw;

export default media;
