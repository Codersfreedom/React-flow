import { Handle, Position } from '@xyflow/react'
import React, { useRef, useState } from 'react'
import useNodeStore from '../store/useNodeStore';

const TextNode = ({ id }) => {
    const [value, setValue] = useState();
    const [eventTriggered, setEventTriggered] = useState(false);
    const [outputNodeId, setOutputNodeId] = useState(null);

    const inputRef = useRef(null);

    const { createNode, setEdges, edges, updateNodeData } = useNodeStore()

    const onChange = (evt) => {
        setValue(evt.target.value);
    }


    const handleChange = (e) => {
        onChange(e);
        const currentValue = e.target.value;

        if (!eventTriggered && e.target.value.trim() !== '') {
            const currentEdges = [...edges];
            const newNodeId = createNode("textOutputNode", currentValue, "text");
            const newEdge = {
                id: `${id}-${newNodeId}`,
                source: `${id}`,
                sourceHandle: `${id}`,
                targetHandle: `${newNodeId}`,
                target: `${newNodeId}`,
            };

            setEdges([...currentEdges, newEdge]);
            setEventTriggered(true);
            setOutputNodeId(newNodeId);



        }

        if (outputNodeId) {
            updateNodeData(outputNodeId, { src: currentValue })
        }


    };

    return (
        <div className='h-32 w-44  text-black bg-white border-1 rounded-xl flex justify-center items-center'>


            <Handle
                type='target'
                position={Position.Top}

                id={id}
            />


            <textarea
                className='outline-none w-full h-full pl-2 border-t-2 border-b-2  border-gray-300  rounded-xl'
                onChange={handleChange} ref={inputRef} value={value} placeholder='Type something...' />

            <Handle
                type='source'
                position={Position.Bottom}

                id={id}
            />

        </div>
    )
}

export default TextNode