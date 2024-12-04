import {create} from 'zustand';
type VideoFile = {
    name: string;     
    size: number;     
    type: string;    
    duration?: number; 
    url: string;
  };
interface VideoState {
    mainFile: VideoFile | null;
    proxyFile: VideoFile | null;
    importFile: (file: File) => void;
    setProxyFile: (file: File) => void;
}
export const useStore = create<VideoState>((set) => ({
    mainFile: null,
    proxyFile: null,
  
    importFile: (file: File) =>
      set(() => ({
        mainFile: {
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file), 
        },
      })),
      
    setProxyFile: (file: File) =>
      set(() => ({
        proxyFile: {
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        },
      })),
  }));

  