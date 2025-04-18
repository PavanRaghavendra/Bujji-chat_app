import React from 'react'
import { memo } from 'react';
import moment from 'moment'
import { fileFormat } from '../../lib/features';
import RenderAttach from './RenderAttach';
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion'
const MessageComponent = ({message}) => {
  const user=useSelector(state=>state.auth.user);
  const {sender,content,attachments=[],createdAt}=message;
  const samesender= sender._id.toString() ===  user._id.toString();
  const timeAgo=moment(createdAt).fromNow();
  return ( 
    <>
    <motion.div
      initial={{opacity:0,x:"-100%"}}
      whileInView={{opacity:1,x:0}}
     className='text-black flex flex-col'>
    {
      samesender?(
        <div className='flex justify-end m-3'>
          <div className='flex flex-col bg-white border-r-2 p-2 rounded-md'>
          <p className='text-blue-600 text-lg'>You</p>
          {content&&<p>{content}</p>}
          {
            attachments.length>0?(
              attachments.map((attach,index)=>
              {
                const url=attach.url;
                const file=fileFormat(url);
                return <>
                <div>
                  <a href={url} target="_self">
                    {RenderAttach(file,url)}
                  </a>
                </div>
                </>
              })
            ):(
              <span></span>
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
              <span></span>
            )
          }
          <p className='text-xs items-start'>{timeAgo}</p>
          </div>
        </div>
      )
    }
    </motion.div>
    </>
  )
}

export default memo(MessageComponent);