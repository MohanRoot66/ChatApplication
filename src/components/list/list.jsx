import React from 'react'
import "./list.css"
import Userinfo from './userinfo/userinfo'
import ChatList from './chatList/chatList'

export default function List() {
  return (
    <div className='list'>
      <Userinfo />
      <ChatList />
    </div>
  )
}
