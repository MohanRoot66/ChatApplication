import React, { useState } from 'react'
import "./chatList.css"
import AddUser from './addUser/addUser'

export default function ChatList() {

  const [adduser,setAdduser] = useState(false)

  function changeImage() 
  {
    setAdduser(!adduser)
  }

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
            <img src='/search.png' alt='' />
            <input type='text' placeholder='Search' />
        </div>
        <img src={adduser ? './minus.png' : "./plus.png"} alt='' className='add' onClick={changeImage}/>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello Jhon</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello Jhon</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello Jhon</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello Jhon</p>
        </div>
      </div>
      {adduser && <AddUser/> }
    </div>
  )
}
