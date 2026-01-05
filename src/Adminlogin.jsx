import React, { useRef } from 'react'
import './styles/Login.css'
import { useNavigate } from 'react-router-dom'

const Adminlogin = () => {
    let email = useRef()
    let pass = useRef()

    let anav = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        let a = email.current.value;
        let b = pass.current.value;
        console.log(a,b);

        if(a=== ""||b===""){
            alert("Please fill all the details")
        }
        else if(a==="admin@gmail.com" && b==="admin123"){
            anav("/adminportal")
        }
        else{
            alert("Invalid admin credentials")
        }
    }   

  return (
    <div>
      <center>
        <div className="login">
            <form action="" onSubmit={handleSubmit}>
                <br /><br />
                <input type="email" name="" id="" placeholder='enter admin email' ref={email}/>
                <br /><br />
                <input type="password" name="" id="" placeholder='enter admin password' ref={pass}/>
                <br /><br />
                <button type="submit" className='btn'>Login</button>
            </form>
        </div>
      </center>
    </div>
  )
}

export default Adminlogin
