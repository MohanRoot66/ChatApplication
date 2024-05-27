import { useEffect } from "react";
import Chat from "./components/chat/chat"
import Detail from "./components/detail/detail"
import List from "./components/list/list"
import Login from "./components/login/login";
import Notification from "./components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useSelector,useDispatch } from 'react-redux';
import fetchUserInfo from "./lib/thunks/fetchUserInfo";

const App = () => {

  const dispatch = useDispatch();

  const {isLoading,currentUser} = useSelector((state) => state.user);

  console.log(currentUser)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>
    {
        dispatch(fetchUserInfo(user?.uid))
    })
    return () =>{
      unsub()
    }
  },[auth])

  if(isLoading)
    return <div className="loading">Loading</div>

  return (
    <div className='container'>
      {
        currentUser ? (<><List />
        <Chat />
        <Detail /></>) : (<Login />)
      }
      <Notification />
    </div>
  )
}

export default App