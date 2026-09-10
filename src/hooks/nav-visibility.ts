import { useRef } from 'react';
import { Easing, makeMutable, withTiming } from 'react-native-reanimated';

/**
 * Shared across every screen so any ScrollView can hide/show the floating
 * radial nav ball, which lives outside the screen tree in the root layout.
 */
export const navVisibility = makeMutable(1);

export function hideNav() {
  navVisibility.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.quad) });
}

export function showNav() {
  navVisibility.value = withTiming(1, { duration: 220, easing: Easing.out(Easing.quad) });
}

const SHOW_DELAY_MS = 220;

/**
 * Returns an `onScroll` handler that hides the nav ball the moment scrolling
 * starts and brings it back a moment after scrolling settles. Works for drag
 * and momentum scrolling alike, and for mouse-wheel scrolling on web (which
 * never fires the drag-specific ScrollView events).
 */
export function useHideNavOnScroll() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return () => {
    hideNav();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(showNav, SHOW_DELAY_MS);
  };
}
