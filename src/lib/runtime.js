export const isRunningExtension = (window.chrome &&
      window.chrome.runtime &&
      window.chrome.runtime.id) || false;

export const isRunningChromeExtension = isRunningExtension;

export function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
