import { Handle, Position } from '@xyflow/react'
import React from 'react'
import useNodeStore from '../store/useNodeStore';

const DropDown = ({ id }) => {
    const [nodeType, setNodeType] = React.useState("default");

    const { createNode, setEdges, edges } = useNodeStore()

    return (
        <div className='h-32 w-44 p-5 space-y-4 text-black bg-white border-1 rounded-xl flex flex-col justify-between items-center'>

            <select
                className='bg-gray-600 text-white h-10 w-40 rounded-xl p-2'
                onChange={(e) => setNodeType(e.target.value)} >
                <option value="default">Select Node Type</option>
                <option value="imageoutputNode">Image Node</option>
                <option value="videooutputNode">Video Node</option>
                <option value="textNode">Text Node</option>
            </select>


            <button
                className='text-white'
                onClick={() => {
                    const newNodeId = createNode(nodeType);
                    const newEdge = {
                        id: `${id}-${newNodeId}`,
                        source: `${id}`,
                        sourceHandle: `${id}`,
                        targetHandle: `${newNodeId}`,
                        target: `${newNodeId}`,
                    };
                    setEdges([...edges, newEdge]);
                }}
            >Add</button>

            <Handle
                type='source'
                position={Position.Bottom}

                id={id}
            />

        </div>
    )
}

export default DropDown