import {Button} from '@mui/material'
import './zustandStore'
import { useStore } from './zustandStore';


export default function ImportButton() {
  const { importFile, setProxyFile, mainFile, proxyFile } = useStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importFile(file); 
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
            {mainFile && <video src={mainFile.url} controls />}
    </>
)};
