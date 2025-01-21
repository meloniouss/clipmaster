import { Button, Card, IconButton } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import SpeedIcon from '@mui/icons-material/Speed';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function Timeline() {
    //what im going to need to put here:
    // 3 different channels (A/V and effect)
    // small line with all the buttons
    // timeline/time scale
    // we can make the time stamps be dynamic based non video lengths
    // mayhbe use icon for timeline things
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
        <div style={{display: "flex", flexDirection: "column", width: "100%", height: "80%"}}> 
                <div style={{width: "100%", borderBottom: "1px solid black", flex: 1}}></div> 
                <div style={{width: "100%", borderBottom: "1px solid black", flex: 1}}></div>
                <div style={{width: "100%", borderBottom: "1px solid black", flex: 1}}></div>
            </div>
    </div>
    </div>












);
}