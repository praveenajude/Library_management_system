import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import API_BASE_URL from '../../config/api'

const Adduser = () => {
  let fname = useRef()
  let lname = useRef()
  let email = useRef()
  let phone = useRef()
  let address = useRef()
  let dob = useRef()

  let nav = useNavigate()

  function addUser(e)
  {
    e.preventDefault()
    let addusertodb={
      firstName: fname.current?.value,
      lastName : lname.current?.value,
      email: email.current?.value,
      phone: phone.current?.value,
      address: address.current?.value,
      birthDate: dob.current?.value
    }
    
    let y = window.confirm(`Do you want to add ${fname.current?.value} user`)
    if(y)
    {
      fetch(`${API_BASE_URL}/users.php`, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(addusertodb)
      })
        .then(res => {
          if (!res.ok) return res.text().then(t => { throw new Error(t || res.statusText) })
          return res.json()
        })
        .then(data => {
          alert(`${fname.current?.value} is added to users`)
          nav(`/adminportal/users`)
        })
        .catch(err => {
          console.error('Error adding user:', err)
          alert('Error adding user: ' + (err.message || err))
        })
    }
  }

  return (
    <div>
      <center>
        <div className="form">
          <form action="" onSubmit={addUser}>
            <br /><br />
            <input type="text" placeholder="Enter First Name" ref={fname}/>
            <br /><br />
            <input type="text" placeholder="Enter Last Name" ref={lname}/>
            <br /><br />
            <input type="email" name="" id="" placeholder="Enter the email" ref={email}/>
            <br /><br />
            <input type="number" name="" id="" placeholder="Enter phone number" ref={phone}/>
            <br /><br />
            <input type="text" name="" id="" placeholder="Enter Address" ref={address}/>
            <br /><br />
            <input type="date" name="" id="" placeholder="Enter Date of Birth" ref={dob}/>
            <br /><br />
            <button>Submit</button>
          </form>
        </div>
      </center>
    </div>
  )
}

export default Adduser
