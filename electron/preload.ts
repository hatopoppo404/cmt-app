import { constextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  ping: () => "pong",
});
