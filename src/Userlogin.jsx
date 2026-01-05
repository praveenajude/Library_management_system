import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Userlogin = () => {
    let emailuser = useRef()
    let passuser = useRef()

    let unav = useNavigate()
    
        function handleSubmitUser(e){
            e.preventDefault()
            let a = emailuser.current.value;
            let b = passuser.current.value;
            console.log(a,b);
    
            if(a=== ""||b===""){
                alert("Please fill all the details")
            }
            else if(a==="user@gmail.com" && b==="user123"){
                unav("/userportal")
            }
            else{
                alert("Invalid user credentials")
            }
        }
  return (
    <div>
      <center>
        <div className="login">
            <form action="" onSubmit={handleSubmitUser}>
                <br /><br />
                <input type="email" name="" id="" placeholder='enter user email' ref={emailuser}/>
                <br /><br />
                <input type="password" name="" id="" placeholder='enter user password' ref={passuser}/>
                <br /><br />
                <button type="submit" className='btn'>Login</button>
            </form>
        </div>
      </center>
    </div>
  )
}

export default Userlogin
