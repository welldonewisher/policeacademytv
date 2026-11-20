export const ALLOWED_IMAGE_REDIRECT_HOSTS: ReadonlySet<string>;
export const ALLOWED_VIDEO_REDIRECT_HOSTS: ReadonlySet<string>;

/** Returns whether a URL can be served by the image-slot redirect proxy. */
export function isAllowedImageRedirectUrl(value: string): boolean;

/** Returns whether the Go preview proxy would redirect to a URL, given a host allowlist. */
export function isServedRedirectUrl(value: string, hosts: ReadonlySet<string>): boolean;

/** Returns whether the image-slot proxy would redirect to a URL. */
export function isServedImageRedirectUrl(value: string): boolean;

/** Returns whether the video-slot proxy would redirect to a URL. */
export function isServedVideoRedirectUrl(value: string): boolean;
