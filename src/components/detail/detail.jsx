import React from 'react'
import "./detail.css"

export default function Detail() {
  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Jane Doe</h2>
        <p>Yoo this is amazing</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhSBaZovY9gct87VlCF7TuETnLe3sKswj6ol2vAst4JA&s" alt="" />
                <span>phototdsf_fsfd.png</span>
              </div>
              <img src="./download.png" alt="" className='icon'/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhSBaZovY9gct87VlCF7TuETnLe3sKswj6ol2vAst4JA&s" alt="" />
                <span>phototdsf_fsfd.png</span>
              </div>
              <img src="./download.png" alt="" className='icon'/>
            </div> 
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhSBaZovY9gct87VlCF7TuETnLe3sKswj6ol2vAst4JA&s" alt="" />
                <span>phototdsf_fsfd.png</span>
              </div>
              <img src="./download.png" alt="" className='icon'/>
            </div>  
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className='logout'>Logout</button>
      </div>
    </div>
  )
}
