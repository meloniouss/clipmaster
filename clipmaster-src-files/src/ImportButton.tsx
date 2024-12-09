import {Button} from '@mui/material'
import './zustandStore'
import { useStore } from './zustandStore';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { useRef } from 'react';
import { fetchFile, toBlobURL } from '@ffmpeg/util';


export default function ImportButton() {
  const { importFile, setProxyFile, mainFile, proxyFile } = useStore();
  const ffmpegRef = useRef(new FFmpeg());
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("CHANGE!")
    if (file) {
      console.log('importing file!')
      importFile(file);
      const ffmpeg = ffmpegRef.current; //TODO: maybe set the ffmpeg ref in zustand so as to not reload it every time? if thats how it would work
      console.log('loading ffmpeg')
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      }); 
      console.log('ffmpeg loaded!')
      console.log('fetching file')

      await ffmpeg.writeFile(file.name, await fetchFile(file));
      console.log('transcoding video')
      await ffmpeg.exec([
        '-i', file.name,                      
        '-vf', 'scale=1280:720',              // resize to 720p
        '-preset', 'ultrafast',
        '-tune', 'zerolatency',
        'output.mp4',                   
      ]);

      console.log('video successfully transcoded!')

      const data = await ffmpeg.readFile('output.mp4');
      const outputFile = new File([data], "output.mp4", { type: "video/mp4" });
      console.log('output file generated')

      setProxyFile(outputFile);

      console.log('Proxy file set!');
    }
  };
return(
  <>
   <Button
       variant="contained"
      component="label"
      >
       Upload Video
      <input
        type="file"
        hidden
        onChange={handleFileChange}
      />
      </Button>
            {proxyFile && <video src={proxyFile.url} controls />}
    </>
)};
