import React from 'react'

const ConfrimDeleteDialog = ({open,handleclose,deletehandler}) => {
  return (
    <div className='fixed inset-0 border-black border-2 p-3 text-center md:text-2xl flex justify-center items-center backdrop-blur-md'>
        <dialog open onClose={handleclose} className='p-2 bg-black text-white'>
            <p>Confrim Delete</p>
            <form method="dialog">
                <p className='m-2'>Are u sure do u want to delete this group?</p>
                <div className='flex justify-end p-2 gap-4'>
                <button onClick={handleclose} className='border-2 border-blue-500 bg-blue-500'>No</button>
                <button onClick={deletehandler} className='border-2 border-red-500 bg-red-500 b-2'>yes</button>
                </div>
             </form>
        </dialog>
    </div>
  )
}

export default ConfrimDeleteDialog