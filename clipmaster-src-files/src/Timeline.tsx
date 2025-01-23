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
    // timeline/time scale
    // we can make the time stamps be dynamic based non video lengths
    // mayhbe use icon for timeline things
    //to-do today -> drag and drop onto the video div
    interface DragItem {
        name: string;
    }
    
    const {addToTimeline,timelineClipList} = useStore();      
    const getClipList = useStore.getState;
    const clipList = getClipList().clipList; // used to avoid stale state
     
      useEffect(() => {     
          console.log('useeffectlist: ' + clipList);
      }, [clipList]);
      useEffect(() => {
        console.log('Timeline updated with new clip:', timelineClipList);
      }, [timelineClipList]);
      const [, forceUpdate] = useState(0);

      useEffect(() => {
        forceUpdate(n => n + 1);
      }, [timelineClipList]);

      useEffect(() => {
        forceUpdate(n => n + 1);
      }, [clipList]);
                  
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.THUMBNAIL,
        item: { name: String },
        drop: (item:DragItem) => {
            console.log('Item dropped:', item);
            console.log('Drop target name: Timeline');
            console.log(clipList)
            console.log('1'+clipList) 
            handleDrop(item);
            console.log('2'+clipList)
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
      const [thumbnailList, setThumbnailList] = useState<string[]>([]);
      useEffect(() => {
        const newThumbnails: string[] = [];
    
        timelineClipList.forEach((clip) => {
          const videoElement = document.createElement('video');
          videoElement.src = clip.url;
          videoElement.crossOrigin = 'anonymous'; 
          videoElement.currentTime = 1;
    
          videoElement.onloadeddata = () => {
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
              newThumbnails.push(canvas.toDataURL('image/png')); 
              if (newThumbnails.length === clipList.length) {
                setThumbnailList(newThumbnails);
              }
            }
          };
        });
      }, [timelineClipList]);

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
        <div style={{width: "100%", borderBottom: "1px solid black", height:"10%"}}>timestamps (work in progress)</div>
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
                {thumbnailList.map((thumbnail, index) => (
                    <img
                    key={index}
                    src={thumbnail}
                    alt={`Thumbnail ${index}`}
                    style={{
                        width: '150px', // Adjust as needed
                        height: 'auto',
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