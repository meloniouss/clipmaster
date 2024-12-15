import ImportButton from './ImportButton'
import 'react-resizable-panels'
import './App.css'
import VideoEditor from './VideoEditor'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

function App() {
  return (
    <div className="app-container">
    <PanelGroup direction="vertical">
      <Panel minSize={33}>
        <PanelGroup direction="horizontal">
          <Panel className="panel" defaultSize={15} minSize={10}>
            <ImportButton />
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
