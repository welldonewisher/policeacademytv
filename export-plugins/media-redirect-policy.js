const COMMON_MEDIA_REDIRECT_HOSTS = [
  'media.gettyimages.com',
  'media.istockphoto.com',
  'blobby.wsimg.com',
  'blobby.test-wsimg.com',
  'blobby.dev-wsimg.com',
  'img1.wsimg.com',
  'isteam.wsimg.com',
  'isteam.test-wsimg.com',
  'isteam.dev-wsimg.com',
];

export const ALLOWED_IMAGE_REDIRECT_HOSTS = new Set([
  ...COMMON_MEDIA_REDIRECT_HOSTS,
  'oaidalleapiprodscus.blob.core.windows.net',
  'img.youtube.com',
  'i.ytimg.com',
]);

export const ALLOWED_VIDEO_REDIRECT_HOSTS = new Set([
  ...COMMON_MEDIA_REDIRECT_HOSTS,
  'cdn.videvo.net',
  'player.vimeo.com',
  'www.youtube.com',
  'storage.googleapis.com',
]);

/**
 * @param {string} value URL to validate.
 * @returns {boolean} Whether the image-slot redirect proxy can serve it.
 */
export function isAllowedImageRedirectUrl(value) {
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  return (
    url.protocol === 'https:' &&
    url.port.length === 0 &&
    ALLOWED_IMAGE_REDIRECT_HOSTS.has(url.hostname)
  );
}

/**
 * Host as written between `://` and the first `/`, `?` or `#`, with any userinfo removed.
 * Go reads this part of the URL, not the form WHATWG normalizes it to.
 * @param {string} value URL to inspect.
 * @returns {string | null} The raw authority host, or null when there is no `://` authority.
 */
function rawAuthorityHost(value) {
  const schemeEnd = value.indexOf('://');
  if (schemeEnd < 0) return null;
  const authority = value.slice(schemeEnd + 3).split(/[/?#]/)[0] ?? '';
  // Go rejects a space anywhere in the authority, including the userinfo before `@`.
  if (authority.includes(' ')) return null;
  return authority.slice(authority.lastIndexOf('@') + 1);
}

/**
 * Mirrors the Go preview proxy's redirect check: an https URL whose Host is listed
 * exactly, with the port included and the case kept. WHATWG hides a default port and
 * decodes escapes in the host, so those spellings are read from the raw text instead.
 * @param {string} value URL to validate.
 * @param {ReadonlySet<string>} hosts Redirect allowlist to check.
 * @returns {boolean} Whether the proxy would redirect to it.
 */
export function isServedRedirectUrl(value, hosts) {
  // WHATWG strips surrounding whitespace and inner tab or newline characters; Go rejects them.
  // eslint-disable-next-line no-control-regex
  if (value !== value.trim() || /[\x00-\x1F\x7F]/.test(value)) return false;
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  if (url.protocol !== 'https:') return false;
  const rawHost = rawAuthorityHost(value);
  if (rawHost === null || rawHost.includes('\\')) return false;
  return hosts.has(rawHost);
}

/**
 * @param {string} value URL to validate.
 * @returns {boolean} Whether the image-slot proxy would redirect to it.
 */
export function isServedImageRedirectUrl(value) {
  return isServedRedirectUrl(value, ALLOWED_IMAGE_REDIRECT_HOSTS);
}

/**
 * @param {string} value URL to validate.
 * @returns {boolean} Whether the video-slot proxy would redirect to it.
 */
export function isServedVideoRedirectUrl(value) {
  return isServedRedirectUrl(value, ALLOWED_VIDEO_REDIRECT_HOSTS);
}
