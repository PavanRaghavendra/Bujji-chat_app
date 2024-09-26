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
    default:
       return <p>NO file</p>
  }
}

export default RenderAttach