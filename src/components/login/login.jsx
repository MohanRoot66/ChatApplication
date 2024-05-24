import React, { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify'

export default function Login() {

    const [avatar,setAvatar] = useState({
        file:null,
        url:""
    })

    const handleAvatar = (e) =>{

        if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
    }
  return (
    <div className='login'>
        <div className="item">
            <p>Welcome back , </p>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Email' name='email' />
                <input type='password' placeholder='Password' name='password' />
                <button>Sign in</button>
            </form>
        </div>
        <div className="separator"> </div>
        <div className="item">
            <p>Create an Account </p>
            <form>
                <label htmlFor='file'>
                    <img src={avatar.url || "./avatar.png"} alt=""/>
                    Upload an Image
                </label>
                <input type='file' id='file' onChange={handleAvatar} style={{display:'none'}}/>
                <input type='text' placeholder='Username' name='username' />
                <input type='password' placeholder='Password' name='password' />
                <button>Sign Up</button>
            </form>
        </div>
    </div>
  )
}
