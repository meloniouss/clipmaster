import { useEffect, useRef, useState } from 'react';
import './zustandStore'
import { useStore } from './zustandStore';

export default function ThumbnailComponent (){
    const {clipList} = useStore();
    const[thumbnailList, setThumbnailList] = useState<string[]>([]);
    //we're gonna use useEffect to set ThumbnailList to the new list whenever clipList changes
    useEffect(() => {
        const newThumbnails: string[] = [];

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
                if (ctx){ ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    newThumbnails.push(canvas.toDataURL('image/png')); // Collect new thumbnails
                    if (newThumbnails.length === clipList.length) {
                        setThumbnailList(newThumbnails);} //this is necessary because otherwise it causes a race condition and it starts messing up the updating 
                }
            }
        });
    }, [clipList]);
    return (
        (thumbnailList as string[]).length > 0 && (
          <div
            style={{display: 'flex', flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            }}>
            {thumbnailList.map((thumbnail, index) => (
              <div style={{display: 'flex', flexDirection: "column", 
                justifyContent: "center",
                alignItems: "center",
                marginBottom: '20px',}}>
                <img key={index} src={thumbnail} alt={`Thumbnail ${index}`}  style={{ width: '300px', height: 'auto', objectFit: 'cover' }}/>
                {clipList[index].name}
              </div>
            ))}
          </div>
        )
      );
        
  
    
}