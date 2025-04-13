import { addEdge, applyEdgeChanges, applyNodeChanges, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import FileNode from './components/ImageNode';
import OutputNode from './components/OutputNode';
import useNodeStore from './store/useNodeStore';
import TextNode from './components/TextNode';
import TextNodeOutput from './components/TextNodeOutput';
import DropDown from './components/DropDown';
import VideoNode from './components/VideoNode';
import ImageNode from './components/ImageNode';


const nodeTypes = { fileNode: FileNode, imageoutputNode: ImageNode, videooutputNode: VideoNode, outputNode: OutputNode, textNode: TextNode, textOutputNode: TextNodeOutput, dropdownNode: DropDown }

function App() {

  const [nodeType, setNodeType] = useState("default");

  const { createNode, nodes, setNodes, edges, setEdges } = useNodeStore();

  const handleAddNode = () => {
    createNode(nodeType);
  }



  const onChnageNodes = useCallback(
    (change) => {
      const updatedNodes = applyNodeChanges(change, nodes);
      setNodes(updatedNodes);
    }
    , [nodes])

  const onEdgeChnage = useCallback(
    (change) => {
      const updatedEdges = applyEdgeChanges(change, edges);
      setEdges(updatedEdges);
    }
    , [edges])

  const onEdgeConnect = useCallback(
    (change) => {
      const updatedEges = addEdge(change, edges);
      setEdges(updatedEges);
    }, [edges])

  return (



    <div
      style={{ width: '100vw', height: '100vh', color: "black" }}
    >

      <div className=' max-w-full float-end m-5 space-x-2  '>
        <select
          className='bg-gray-600 text-white h-10 w-40 rounded-xl p-2'
          onChange={(e) => setNodeType(e.target.value)}
        >
          <option value="default">Select Node Type</option>
          <option value="dropdownNode">Dropdown Node</option>
          <option value="default">Default Node</option>

        </select>
        <button
          className='text-white'
          onClick={handleAddNode}
        >
          Add</button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onChnageNodes}
        onEdgesChange={onEdgeChnage}
        onConnect={onEdgeConnect}
      />
    </div>

  )
}

export default App
