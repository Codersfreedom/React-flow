import { Handle, Position } from '@xyflow/react';
import React from 'react'

const OutputNode = ({ data, id }) => {

    return (
        <div className=' h-60 w-52  text-black bg-white border-1 rounded-xl flex flex-col justify-between items-center'>
            <Handle type='target' position={Position.Top} id={id} />
            {data.mediaType == "image" ? <img src={data.src} className='w-44 h-full object-cover rounded-xl' alt="image" /> :
                <video src={data.src} controls muted className='w-60 h-full object-cover rounded-xl' />
            }

        </div>
    )
}

export default OutputNode