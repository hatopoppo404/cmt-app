export {};

declare global {
  interface Window {
    electronAPI: {
      ping: () => string;
    };
  }
}
