import ImportButton from './ImportButton'
import 'react-resizable-panels'
import './App.css'
import VideoEditor from './VideoEditor'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import ThumbnailComponent from './thumbnailComponent'

function App() {
  return (
    <div className="app-container">
    <PanelGroup direction="vertical">
      <Panel minSize={33}>
        <PanelGroup direction="horizontal">
          <Panel className="panel" defaultSize={17.5} minSize={10} style={{ height: '80vh', width: '100%'}}> 
          <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  position: 'relative', 
                  overflowY: 'auto',
                  overflowX: 'clip',
                  height: '100%', 
                  width: '100%',
                }}
              >
              <div style={{ position: 'absolute', top: '12.5px', width: '100%', zIndex: 1 }}>
                  <ImportButton />
                </div>
                <div style={{ marginTop: '60px', width: '100%' }}>
                  <ThumbnailComponent />
                </div>
            </div>
    
          </Panel>
          <PanelResizeHandle className="resize-handle horizontal" />
          <Panel className="panel">
            <VideoEditor />
          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle className="resize-handle" />
      <Panel className="panel" minSize={20} defaultSize={28}>
        VIDEO EDITOR TIMELINE
      </Panel>
    </PanelGroup>
  </div>
  )
}

export default App
