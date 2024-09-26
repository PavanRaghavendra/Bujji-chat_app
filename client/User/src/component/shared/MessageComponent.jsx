import React from 'react'
import { memo } from 'react';
import moment from 'moment'
import { fileFormat } from '../../lib/features';
import RenderAttach from './RenderAttach';
const MessageComponent = ({message,User}) => {
  const {sender,content,attachments=[],createdAt}=message;
  const samesender= sender._id===User._id;
  const timeAgo=moment(createdAt).fromNow();
  return ( 
    <>
    <div className='text-black flex flex-col'>
    {
      samesender?(
        <div className='flex justify-end m-3'>
          <div className='flex flex-col bg-white border-r-2 p-2 rounded-md'>
          <p className='text-blue-600 text-lg'>{sender.name}</p>
          {content&&<p>{content}</p>}
          {
            attachments.length>0?(
              attachments.map((attach,index)=>
              {
                const url=attach.url;
                const file=fileFormat(url);
                return <>
                <div>
                  <a href='' target='_blank'>
                    {RenderAttach(file,url)}
                  </a>
                </div>
                </>
              })
            ):(
              <div>
              </div>
            )
          }
          <p className='text-xs items-start'>{timeAgo}</p>
          </div>
        </div>
      ):(
        <div className='flex justify-start m-3'>
         <div className='flex flex-col bg-white border-r-2 p-2  rounded-md'>
          <p className='text-blue-600 text-lg'>{sender.name}</p>
          {content&&<p>{content}</p>}
          {
            attachments.length>0?(
              attachments.map((attach,index)=>
              {
                const url=attach.url;
                const file=fileFormat(url);
                return <>
                <div>
                  <a href='' target='_self'>
                    {RenderAttach(file,url)}
                  </a>
                </div>
                </>
              })
            ):(
              <div>
                <p>NO</p>
              </div>
            )
          }
          <p className='text-xs items-start'>{timeAgo}</p>
          </div>
        </div>
      )
    }
    </div>
    </>
  )
}

export default memo(MessageComponent);