import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer({ url }) {
    return (
        <ReactPlayer width='100%' height='100%' controls='true' url={url} />
    )
}