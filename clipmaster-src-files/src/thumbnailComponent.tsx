import { useEffect, useRef, useState } from 'react';
import './zustandStore'
import { useStore } from './zustandStore';

export default function ThumbnailComponent (){
    const {clipList} = useStore();
    const[thumbnailList, setThumbnailList] = useState<String[]>([]);
    //we're gonna use useEffect to set ThumbnailList to the new list whenever clipList changes
    useEffect(() => {
        clipList.forEach((clip) => {
            const videoElement = document.createElement('video');
            videoElement.src = clip.url;
            videoElement.crossOrigin = 'anonymous'; //for cors
            videoElement.currentTime = 1;
            
            videoElement.onloadeddata = () => { //when the video loads, we capture the first second of the video and use it as a thumbnail
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const ctx = canvas.getContext('2d');
                if (ctx) ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                setThumbnailList([...thumbnailList, canvas.toDataURL('image/png')])
            }
        }, clipList) ;
    })
    return(<div>we gotta start displaying the thumbnails here soon</div>)
  
    
}