import React from 'react'
import profilephoto from "../../assets/images/profile.png";
import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";
import Moment from 'moment'
import moment from 'moment';
const Profile = ({user}) => {
  return (
    <>
    <div className='h-screen'>
    <div className='flex flex-col justify-center items-center'>
      <img src={profilephoto} alt='profile' className="md:w-200 md:h-200 rounded-full md:mb-4 border-5 border-solid border-white "/>
    </div>
    <ProfileCard heading={"Bio"} text={"Write Something"}/>
    <ProfileCard heading={"Username"} icon={male} text={user.username}/>
    <ProfileCard heading={"Name"} icon={male} text={user.name}/>
    <ProfileCard heading={"Joined"} icon={male} text={moment(user.createdAt).fromNow()}/>
    </div>
    </>
  )
}
const ProfileCard=({text,icon,heading})=>
    {
      return(
        <>
        <div className='flex flex-row gap-2 mt-4 mb-4 text-blue-500 justify-center items-center'>
          {
            icon&&<img src={icon} alt="male" className='md-w-5 md:h-5 border-2 border-solid border-white rounded'/>
          }
          <div className='text-center'>
            <p className='font-semibold md:text-2xl'>{text}</p>
            <p>{heading}</p>
          </div>
        </div>
        </>
      )
    }

export default Profile