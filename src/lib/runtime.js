export const isRunningExtension = (window.chrome &&
      window.chrome.runtime &&
      window.chrome.runtime.id) || false;

export const isRunningChromeExtension = isRunningExtension;
