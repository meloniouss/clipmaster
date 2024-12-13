import {create} from 'zustand';
type VideoFile = {
    name: string;     
    size: number;     
    type: string;    
    duration?: number; 
    url: string;
  };
interface VideoState {
    clipList: VideoFile[] | [];
    mainFile: VideoFile | null;
    importFile: (file: File) => void;

}
export const useStore = create<VideoState>((set) => ({
    mainFile: null,
    clipList: [],
    importFile: (file: File) =>
      set((state) => ({
        clipList: [
          ...(state.clipList || []), // takes clipList of the state, or empty if it's empty, and adds the file
          {
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file), 
          },
        ],
      })),
  }));

  