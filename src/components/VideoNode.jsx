import { Handle, Position } from '@xyflow/react';
import React, { useRef, useState } from 'react'
import useNodeStore from '../store/useNodeStore';

const VideoNode = ({ id }) => {

    const [video, setVideo] = useState(null);
    const [videoName, setVideoName] = useState(null);


    const videoRef = useRef(null)

    const { createNode, edges, setEdges } = useNodeStore();


    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file && file.type.startsWith("video/")) {
            setVideoName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideo(reader.result);
            };
            reader.readAsDataURL(file);
        }
        else {
            alert("Please select a valid  video file");
        }
    }

    const handleViewOutput = () => {
        if (!video) return alert("Please select a file first");

        if (!videoRef.current.value) {
            const result = window.confirm("Are you sure you want to replace the file?");
            if (result) {
                setVideo(null);
                setVideoName(null);

            } else {
                return;
            }
        }

        const currentEdges = [...edges];

        const newNodeId = createNode("outputNode", video, "video");

        const newEdge = {
            id: `${id}-${newNodeId}`,
            source: `${id}`,
            sourceHandle: `${id}`,
            targetHandle: `${newNodeId}`,
            target: `${newNodeId}`,
        };

        setEdges([...currentEdges, newEdge]);


        videoRef.current.value = null;
    }

    return (
        <div className='h-60 w-44  pb-2 text-black bg-white  border-1 rounded-xl flex flex-col justify-between items-center'>
            <Handle type='target' position={Position.Top} id={id} />
            {!video ?
                <>
                    <img src="/image_placeholder.webp" className='w-44 h-28 object-cover rounded-xl  ' alt="" />

                    <p className=' my-2 '>No video selected</p>



                </> :
                <>
                    <img src="/placeholder.jpg" className='w-44 h-36 object-cover rounded-xl' alt="image" />
                    <p className=' my-2 overflow-ellipsis whitespace-nowrap inline-block  text-nowrap h-10 text-center'> {videoName}</p>
                </>
            }
            <input
                onChange={handleVideoChange}
                ref={videoRef} type="file" hidden name="" id="" />

            {!video ? <button
                onClick={() => videoRef.current.click()}
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

export default VideoNode