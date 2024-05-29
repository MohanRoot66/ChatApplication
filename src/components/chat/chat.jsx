import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
import EmojiPicker from 'emoji-picker-react'
import { onSnapshot,doc, updateDoc, arrayUnion,collection, getDoc } from 'firebase/firestore';
import {db} from "../../lib/firebase"
import { useSelector } from 'react-redux';
import upload from '../../lib/upload';

export default function Chat() {
  
  const [visible,setIsvisible] = useState(false);
  const {isCurrentUserBlocked,isReceiverBlocked} = useSelector(state=>state.chat)

  const [text,setText] = useState("");

  const [chats,setChat] = useState("");

  const [img,setImg] = useState({
    file:null,
    url:""
  })

  const {currentUser} = useSelector(state=>state.user);

  const handleImg = (e) =>{

    console.log("first")

    if(e.target.files[0]){
    setImg({
        file:e.target.files[0],
        url:URL.createObjectURL(e.target.files[0])
    })
    }
}

  const handleEmoji = (e) =>
  {
      setText((prev)=>prev+e.emoji)
      setIsvisible(false)
  } 

  const endRef = useRef(null);

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior: "smooth"})
  },[])


  const {chatId,user} = useSelector(state=>state.chat);

  useEffect(()=>{
    const unSub = onSnapshot(
      doc(db,"chats",chatId),
      (res)=>{
          setChat(res.data())
      }
    )

    return () =>{
      unSub()
    }
  },[chatId])


  const addMessage = async () =>{

    const chatDocRef = doc(db,"chats", chatId);

     if(text==="") return;

    let imgUrl = null;


    try{

      if(img.file){
        imgUrl  = await upload(img.file);
        console.log(imgUrl);
      }

    await  updateDoc(chatDocRef,{
      messages:arrayUnion({
        senderId:currentUser.id,
        createdAt:Date.now(),
        text,
        ...(imgUrl && {img:imgUrl}),
      })
     })

     const userIDs = [currentUser.id,user.id];

     userIDs.forEach(async(id)=>{

     const userChatRef = doc(db,"userchats",id);

     const userChatSnapChat = await getDoc(userChatRef);

     if(userChatSnapChat.exists())
      { 
          const userChatsData = userChatSnapChat.data();

          const chatIndex = userChatsData.chats.findIndex(c=>c.chatId===chatId);

          userChatsData.chats[chatIndex].lastMessage= text 
          userChatsData.chats[chatIndex].isSeen = id===currentUser.id ? true : false
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef,{
            chats:userChatsData.chats
          })
      }

    })

    }
    catch(err){
        console.log(err);
    }

    setImg({
      file:null,
      url:""
    })

    setText("")
  }


  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chats?.messages?.map((message)=>(
            <div className={message.senderId === currentUser.id ? "message own" : "message"} key={message?.createdAt}>
              <div className="texts">
                {message.img && <img src="./avatar.png" alt="" />}
                <p>{message.text}</p>
                {/* <span>1 min ago</span> */}
              </div>
          </div>
        ))}

        {img.url && <div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>
        }        

        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor='file'>
            <img src="./img.png" alt="" />
          </label>
          <input type='file' id='file' hidden onChange={handleImg}/>
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input 
        type="text" 
        placeholder={isCurrentUserBlocked || isReceiverBlocked ?'You cannot send a message': 'Type a message ....'}
        value={text} onChange={(e)=>setText(e.target.value)} 
        disabled={isCurrentUserBlocked || isReceiverBlocked}/>
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={()=>setIsvisible(!visible)}/>
          <div className="picker">
            <EmojiPicker open={visible} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className="sendButton" disabled={isCurrentUserBlocked || isReceiverBlocked} onClick={addMessage}>Send</button>
      </div>
    </div>
  )
}
