export {};

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>;
      openFile: () => Promise<string | null>;
    };
  }
}
