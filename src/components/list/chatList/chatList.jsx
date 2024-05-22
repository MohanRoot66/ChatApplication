import React, { useState } from 'react'
import "./chatList.css"

export default function ChatList() {

  const [image,setImage] = useState('./plus.png')

  function changeImage() 
  {
    if(image.startsWith("./p")){
      setImage("./minus.png")
      return
    }
    setImage("./plus.png")
  }

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
            <img src='/search.png' alt='' />
            <input type='text' placeholder='Search' />
        </div>
        <img src={image} alt='' className='add' onClick={changeImage}/>
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
    </div>
  )
}
