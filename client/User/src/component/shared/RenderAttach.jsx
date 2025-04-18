import React from 'react'

const RenderAttach = (file,url) => {
  switch(file)
  {
    case "video":
       return <video src={url} preload="none" width={200} controls/>
    case "image":
       return <img src={url} alt='attachments' width={200} height={150}/>
    case "audio":
       return <audio src={url} preload='none' controls/>
    case "file":
      return (
        <a href={url} target='_blank' rel="noopener noreferrer">
          Download File
        </a>
      )
    default:
      return <p>No file available</p>
  }
}

export default RenderAttach