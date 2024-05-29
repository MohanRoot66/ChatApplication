import React from 'react'
import "./detail.css"
import { auth, db } from '../../lib/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { changeBlock } from '../../lib/slices/chatSlice'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

export default function Detail() {

  const {chatId,user,isCurrentUserBlocked,isReceiverBlocked} = useSelector(state=>state.chat)
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state=>state.user);

  const handleBlock = async() =>
  {
      if(!user) return

      const userDocRef = doc(db,"users",currentUser.id);

      try{

        await updateDoc(userDocRef,{
          blocked:isReceiverBlocked ? arrayRemove(user.id) : 
          arrayUnion(user.id)
        })

        dispatch(changeBlock())

      }
      catch{
        console.log(err)
      }
  }

  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>{user?.username}</h2>
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
        <button onClick={handleBlock}>{isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked ? "User Blocked" : "Block User"}</button>
        <button className='logout' onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}
