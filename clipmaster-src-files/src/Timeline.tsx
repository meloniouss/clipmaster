import {IconButton } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import SpeedIcon from '@mui/icons-material/Speed';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { useStore } from "./zustandStore";
import { useEffect, useState } from "react";
export default function Timeline() {
    // to do -> re-work how thumbnails match up with their video names
    // there seem to be some glitches when you add the same video 3+ times for some reason
    // maybe don't allow imports if a video already exists? for performance reasons (less to store in browser memory)
    interface DragItem {
        name: string;
    }
    
    const [totalClipDuration, setTotalClipDuration] = useState(0);
    useEffect(() => {
      setTotalClipDuration(300);
    }, []); 
    
    const intervalTimeDelta = totalClipDuration/12;
    const intervalCount = 12;
    const vidStore = useStore();
    const {addToTimeline} = vidStore;      
    const getClipList = useStore.getState;
    const clipList = getClipList().clipList; // used to avoid stale state
    const timelineClipList = useStore.getState().timelineClipList;
    const [thumbnailList, setThumbnailList] = useState<string[]>([]); 
    useEffect(()=>{
      useStore.getState();
    }, [timelineClipList]);
    
    useEffect(() => {
      const generateThumbnails = async () => {
          const newThumbnails: string[] = [];
          for (const clip of timelineClipList) {
              const videoElement = document.createElement('video');
              videoElement.src = clip.url;
              videoElement.crossOrigin = 'anonymous';
              videoElement.currentTime = 1;
  
              await new Promise<void>((resolve) => {
                  videoElement.onloadeddata = () => {
                      const canvas = document.createElement('canvas');
                      canvas.width = videoElement.videoWidth;
                      canvas.height = videoElement.videoHeight;
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                          newThumbnails.push(canvas.toDataURL('image/png'));
                      }
                      resolve();
                  };
              });
          }
          setThumbnailList(newThumbnails);
      };
  
      generateThumbnails();
  }, [timelineClipList]);
     
      useEffect(() => {     
          console.log('useeffectlist: ' + clipList);
      }, [clipList]);
      useEffect(() => {
        console.log('Timeline updated with new clip:', timelineClipList); //force rerender
      }, [timelineClipList]);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.THUMBNAIL,
        item: { name: String },
        drop: (item:DragItem) => {
            console.log('Item dropped:', item);
            console.log('Drop target name: Timeline');
            handleDrop(item);
            console.log("updated");
            return { name: 'Timeline' };
        },
        collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        }),
    }))
    const isActive = canDrop && isOver
    if (isActive) {
      console.log('is active')
      console.log(clipList)
    } else if (canDrop) {
      console.log('currently hovering')
    }


    const handleDrop = (_item: { name: string }) => {
        // find the video in the clipList by name
        const updatedClipList = getClipList().clipList;
        console.log('clipList BEFORE DROP:');
        console.log(clipList)
        const clip = updatedClipList.find((clip) => clip.name == _item.name);
        console.log('Video name: ' +_item.name);
        if (clip) {
            addToTimeline(clip); // we add it to the list of timeline clips, the useeffect will generate a thumbnail for this clip, we just have to fetch it
        } else {
            console.log('Clip not found in the clip list');
            console.log(updatedClipList)
        }
    };

    return(
    <div style={{width: "100%", height: "100%", overflow: "hidden"}}>
        <div style={{display: "flex", flexDirection: "row",width: "100%", borderBottom: "1px solid black", height:"10%", justifyContent: "left", alignItems: "center"}}>
           <div style={{width: "30%", justifyContent: "left", flex: 0.5}}>
                <IconButton color="primary" sx={{ }}><ContentCutIcon/></IconButton>
                <IconButton color="primary" sx={{  }}><SpeedIcon/></IconButton>
                <IconButton color="primary" sx={{  }}><DeleteOutlineIcon/></IconButton>
           </div>
           <div style={{justifyItems: "center", flex: 3}}>
                <IconButton color="primary" sx={{ }}><FastRewindIcon/></IconButton>
                <IconButton color="primary" sx={{ }}><PlayCircleIcon/></IconButton>
                <IconButton color="primary" sx={{}}><FastForwardIcon/></IconButton>
           </div>
        </div>
        <div style={{ width: "100%", borderBottom: "1px solid black", height: "10%", display: "flex", justifyContent: "space-between", alignItems: "center", justifyItems:"left", paddingLeft:"3vh"}}>
          {Array.from({ length: intervalCount+2}, (_, i) => {
            const timeInSeconds = Math.floor(intervalTimeDelta * (i)); 
            const minutes = Math.floor(timeInSeconds / 60); 
            const seconds = timeInSeconds % 60; 
            return (
              <div key={i}>
                {`${minutes}:${seconds.toString().padStart(2, '0')}`}
              </div>
            );
          })}
          </div>

    <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%"}}>
        <div style={{display: "flex", flexDirection:'column', height: "80%", justifyItems: "center", justifyContent: "space-between"}}>
            <div style={{ flex: 1, display: "flex", alignItems: "center",borderRight: "1px solid black", borderBottom: "0px solid black"}}>
                <AutoAwesomeIcon style={{ fontSize: "3vh"}} /> </div>
            <div style={{ flex: 1, display: "flex",  alignItems: "center",borderRight: "1px solid black", borderBottom: "0px solid black"}}>
                <VideocamIcon style={{ fontSize: "3vh" }} /> 
            </div>
            <div style={{ flex: 1, display: "flex",  alignItems: "center",borderRight: "1px solid black", borderBottom: "0px solid black"}}>
                <VolumeUpIcon style={{ fontSize: "3vh" }} />  
            </div>
        </div>
        <div ref={drop} style={{display: "flex", flexDirection: "column", width: "100%", height: "80%"}}> 
                <div style={{width: "100%", borderBottom: "1px solid black", flex: 1}}></div> 
                <div style={{width: "100%", borderBottom: "1px solid black", flex: 1}}>
                {thumbnailList.map((thumbnail, index) => ( //issue 
                    <img
                    key={index}
                    src={thumbnail}
                    alt={`Thumbnail`}
                    style={{
                        width: '150px', // 100% /numclips
                        height: '100%', //
                        objectFit: 'cover',
                    }}
                    />
                ))}
                </div>
                <div style={{width: "100%", borderBottom: "1px solid black", flex: 1}}></div>
            </div>
    </div>
    </div>












);
}