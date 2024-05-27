import React, { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {auth, db} from "../../lib/firebase"
import { doc, setDoc } from "firebase/firestore"; 
import upload from '../../lib/upload'

export default function Login() {

    const [avatar,setAvatar] = useState({
        file:null,
        url:""
    })

    const [loading,setLoading] = useState(false);

    const handleAvatar = (e) =>{

        if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
        }
    }

    const handleLogin =async (e) =>{
        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.target);

        const {email,password} = Object.fromEntries(formData);

        try{

           await signInWithEmailAndPassword(auth,email,password);

        }
        catch(err){
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }

    const handleRegister = async (e) =>{
        e.preventDefault()

        setLoading(true)

        const formData =  new FormData(e.target);

        const {username,email,password} = Object.fromEntries(formData);

        try{
            
            const response = await createUserWithEmailAndPassword(auth,email,password)

            const imgUrl =await upload(avatar.file)

            console.log("=>",imgUrl)
            // Add a new document in collection "cities"
            await setDoc(doc(db, "users", response.user.uid), {
                username,
                email,
                imgUrl,
                id:response.user.uid,
                blocked:[]
            });

            await setDoc(doc(db, "userchats", response.user.uid), {
                chats:[]
            });


            toast.success("Account Created")

        }
        catch(error){
            toast.error(error.code)
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <div className='login'>
        <div className="item">
            <p>Welcome back , </p>
            <form onSubmit={handleLogin}>
                <input type='text' placeholder='Email' name='email' />
                <input type='password' placeholder='Password' name='password' />
                <button disabled={loading}>{loading ? "Loading" : "Sign in"}</button>
            </form>
        </div>
        <div className="separator"> </div>
        <div className="item">
            <p>Create an Account </p>
            <form onSubmit={handleRegister}>
                <label htmlFor='file'>
                    <img src={avatar.url || "./avatar.png"} alt=""/>
                    Upload an Image
                </label>
                <input type='file' id='file' onChange={handleAvatar} style={{display:'none'}}/>
                <input type='text' placeholder='Username' name='username' />
                <input type='text' placeholder='Email' name='email' />
                <input className='inp' type='password' placeholder='Password' name='password' />
                <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
            </form>
        </div>
    </div>
  )
}
