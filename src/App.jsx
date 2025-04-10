import { addEdge, applyEdgeChanges, applyNodeChanges, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';

function App() {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeId, setNodeId] = useState(1);


  const handleAddNode = () => {
    const newNode = {
      id: nodeId.toString(),
      data: { label: `Node ${nodeId}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    }

    setNodes((prev) => [...prev, newNode]);
    setNodeId((prev) => prev + 1);
  }

  const onChnageNodes = useCallback(
    (change) => setNodes((prev) => applyNodeChanges(change, prev))
    , [])

  const onEdgeChnage = useCallback(
    (change) => setEdges((prev) => applyEdgeChanges(change, prev))
    , [])

  const onEdgeConnect = useCallback(
    (change) => setEdges((prev) => addEdge(change, prev)), []
  )
  return (
    <div
      style={{ width: '100vw', height: '100vh', color: "black" }}
    >

      <div className=' max-w-full float-end m-5  '>
        <button
          className='text-white'
          onClick={handleAddNode}
        >
          Add</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onChnageNodes}
        onEdgesChange={onEdgeChnage}
        onConnect={onEdgeConnect}
      />
    </div>
  )
}

export default App
