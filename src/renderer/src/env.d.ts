/// <reference types="vite/client" />
export {};

declare global {
  interface Window {
    electronAPI: {
      pickMusicFolder: () => Promise<{ name: string; path: string }[]>;
    };
  }
}
