import { Handle, Position } from '@xyflow/react';
import React, { useCallback, useState } from 'react'

const TextNodeOutput = ({ data, id }) => {

    console.log(data)



    return (
        <div className='h-60 w-44 pb-2 text-black bg-white border-1 rounded-xl flex flex-col justify-between items-center'>
            <Handle
                type='target'
                position={Position.Top}
                isConnectable={true}
                id={id}
            />

            <div className=''>
                <div className='h-52 max-w-44 p-2 overflow-y-auto overflow-x-hidden flex flex-wrap break-words break-all'>
                    <p className='block'>{data.src}</p>
                </div>

            </div>


        </div>
    )
}

export default TextNodeOutput