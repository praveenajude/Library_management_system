import {useState } from 'react'
import Adminlogin from './Adminlogin'
import Userlogin from './Userlogin'

const Loginpage = () => {
    let[data, setData] = useState(true)
    function handleClick(){
        setData(!data)
    }

  return (
    <div>
      <center>
        <button onClick={handleClick} className='btn'>{data ? "Admin Login" : "User Login"}</button>
        <h1>Welcome to {data ? "Admin" : "User"} Login</h1>
        {data? <Adminlogin/>:<Userlogin/>}
      </center>
    </div>
  )
}   

//to run the local server - npx json-server --watch src/Data/data.json --port 4000
export default Loginpage
