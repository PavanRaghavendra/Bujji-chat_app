import React from 'react'
import profilephoto from "../../assets/images/profile.png";
import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";
import Moment from 'moment'
import moment from 'moment';
const Profile = () => {
  return (
    <>
    <div className='flex flex-col justify-center items-center'>
      <img src={profilephoto} alt='profile' className="md:w-200 md:h-200 rounded-full md:mb-4 border-5 border-solid border-white "/>
    </div>
    <ProfileCard heading={"Bio"} text={'jwbnilqenrtyujnbvcds'}/>
    <ProfileCard heading={"Username"} icon={male} text={"qwerty@gamil.com"}/>
    <ProfileCard heading={"Name"} icon={male} text={"Pavan Raghava"}/>
    <ProfileCard heading={"Joined"} icon={male} text={moment('2023-11-03T18:30:00.000Z').fromNow()}/>
    </>
  )
}
const ProfileCard=({text,icon,heading})=>
    {
      return(
        <>
        <div className='flex flex-row gap-2 mt-4 mb-4 text-white justify-center items-center'>
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