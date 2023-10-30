"use client";

export function isMacLike() {
  const userAgent = window.navigator.userAgent;
  return !!userAgent && /(Mac|iPhone|iPod|iPad)/i.test(userAgent);
}
