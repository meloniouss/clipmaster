import {Button} from '@mui/material'
import './zustandStore'
import { useStore } from './zustandStore';


export default function ImportButton() {
  const { importFile} = useStore();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("CHANGE!")
    if (file) {
      console.log('importing file!')
      importFile(file);
      console.log('file imported');
    }
  };
return(
  <>
   <Button
       variant="contained"
      component="label"
      style={{marginBottom: '20px'}}
      >
       Upload Video
      <input
        type="file"
        hidden
        onChange={handleFileChange}
      />
      </Button>
      
    </>
)};
