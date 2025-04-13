import { Handle, Position } from '@xyflow/react';
import React, { useRef, useState } from 'react'
import useNodeStore from '../store/useNodeStore';

const ImageNode = ({ id }) => {

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);


    const imageRef = useRef(null)

    const { createNode, edges, setEdges } = useNodeStore();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file && file.type.startsWith("image/")) {
            setImageName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        else {
            alert("Please select a valid image or video file");
        }
    }

    const handleViewOutput = () => {
        if (!image) return alert("Please select a file first");

        if (!imageRef.current.value) {
            const result = window.confirm("Are you sure you want to replace the file?");
            if (result) {
                setImage(null);
                setImageName(null);

            } else {
                return;
            }
        }

        const currentEdges = [...edges];

        const newNodeId = createNode("outputNode", image, "image");

        const newEdge = {
            id: `${id}-${newNodeId}`,
            source: `${id}`,
            sourceHandle: `${id}`,
            targetHandle: `${newNodeId}`,
            target: `${newNodeId}`,
        };

        setEdges([...currentEdges, newEdge]);



    }

    return (
        <div className='h-60 w-44  pb-2 text-black bg-white  border-1 rounded-xl flex flex-col justify-between items-center'>
            <Handle type='target' position={Position.Top} id={id} />
            {!image ?
                <>
                    <img src="/image_placeholder.webp" className='w-44 h-28 object-cover rounded-xl  ' alt="" />

                    <p className=' my-2 '>No image selected</p>



                </> :
                <>
                    <img src="/placeholder.jpg" className='w-44 h-36 object-cover rounded-xl' alt="image" />
                    <p className=' my-2 overflow-ellipsis whitespace-nowrap inline-block  text-nowrap h-10 text-center'> {imageName}</p>
                </>
            }
            <input
                onChange={handleImageChange}
                ref={imageRef} type="file" hidden name="" id="" />

            {!image ? <button
                onClick={() => imageRef.current.click()}
                className='bg-gray-600! text-white! ' >Select a media file</button>
                : <button
                    onClick={handleViewOutput}
                    className='bg-gray-600! text-white! '
                >Click to view</button>
            }
            <Handle type='source' position={Position.Bottom} id={id} />
        </div>
    )
}

export default ImageNode