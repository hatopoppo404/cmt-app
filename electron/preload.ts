import type { Case } from "@/types/case";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  ping: () => ipcRenderer.invoke("ping"),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),

  getCases: () => ipcRenderer.invoke("cases:get"),
  saveCases: (cases: Case[]) => ipcRenderer.invoke("cases:save", cases),
  resetCases: () => ipcRenderer.invoke("cases:reset"),
});
