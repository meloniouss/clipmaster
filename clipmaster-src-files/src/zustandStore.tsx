import { create } from 'zustand';

type VideoFile = {
  name: string;
  size: number;
  type: string;
  duration?: number;
  url: string;
  start?: number; //optional for clips in the timeline
  end?: number;
};

interface VideoState {
  clipList: VideoFile[] | [];
  mainFile: VideoFile | null;
  timelineClipList: VideoFile[] | []; 
  importFile: (file: File) => void;
  addToTimeline: (clip: VideoFile) => void;
  removeFromTimeline: (clipName: string) => void;
  getTimelineClip: (clipName: string) => VideoFile | undefined; 
  updateTimelineClip: (clipName: string, start: number, end: number) => void; 

}

export const useStore = create<VideoState>((set, get) => ({
  mainFile: null,
  clipList: [],
  timelineClipList: [], 

  importFile: (file: File) =>
    set((state) => ({
      clipList: [
        ...(state.clipList || []),
        {
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        },
      ],
    })),

  addToTimeline: (clip: VideoFile) =>
    set((state) => ({
      timelineClipList: [
        ...(state.timelineClipList || []),
        clip,
      ],
    })),

  removeFromTimeline: (clipName: string) =>
    set((state) => ({
      timelineClipList: state.timelineClipList.filter((clip) => clip.name !== clipName),
    })),

  getTimelineClip: (clipName: string) => { //may be unnecessary
    const { timelineClipList } = get();
    return timelineClipList.find((clip) => clip.name === clipName);
  },
  updateTimelineClip: (clipName: string, start: number, end: number) =>
    set((state) => ({
      timelineClipList: state.timelineClipList.map((clip) =>
        clip.name === clipName ? { ...clip, start, end } : clip
      ),
    })),
}));
