import React from 'react'
import "./userinfo.css"
import { useSelector } from 'react-redux'

export default function Userinfo() {

  const {currentUser} = useSelector(state=>state.user);

  return (
    <div className='userinfo'>
        <div className='user'> 
            <img src={currentUser.imgUrl || './avatar.png'} alt=''/>  
            <h2>{currentUser.username}</h2>
        </div>
        <div className='icons'>
            <img src='./more.png' alt=''/>  
            <img src='./video.png' alt=''/>  
            <img src='./edit.png' alt=''/>  
        </div>
    </div>
  )
}
