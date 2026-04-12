import { ipcRenderer, contextBridge } from 'electron';
// Expose a safe API to the renderer
contextBridge.exposeInMainWorld('electronAPI', {
    // Generic IPC
    on: (...args) => {
        const [channel, listener] = args;
        return ipcRenderer.on(channel, (event, ...rest) => listener(event, ...rest));
    },
    off: (...args) => {
        return ipcRenderer.off(...args);
    },
    send: (...args) => ipcRenderer.send(...args),
    invoke: (...args) => ipcRenderer.invoke(...args),
});
