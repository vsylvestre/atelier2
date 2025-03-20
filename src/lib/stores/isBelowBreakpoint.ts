import { createMatchMediaStore } from '@288-toolkit/device/media';

/**
 * A readable store that returns true if the current viewport is smaller
 * than the bp breakpoint, which is 800px.
 */
export const isBelowBreakpoint = createMatchMediaStore('(max-width: 800px)');
