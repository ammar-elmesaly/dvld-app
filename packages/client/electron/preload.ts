import { ipcRenderer, contextBridge } from 'electron';

// Expose a safe API to the renderer
contextBridge.exposeInMainWorld('electronAPI', {
    // Generic IPC
    on: (...args: Parameters<typeof ipcRenderer.on>) => {
        const [channel, listener] = args;
        return ipcRenderer.on(channel, (event, ...rest) => listener(event, ...rest));
    },
    off: (...args: Parameters<typeof ipcRenderer.off>) => {
        return ipcRenderer.off(...args);
    },
    send: (...args: Parameters<typeof ipcRenderer.send>) => ipcRenderer.send(...args),
    invoke: (...args: Parameters<typeof ipcRenderer.invoke>) => ipcRenderer.invoke(...args),
});
