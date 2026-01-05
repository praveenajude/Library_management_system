import { useEffect, useState } from "react"
import "./../../styles/Users.css"
import API_BASE_URL from '../../config/api'

const Users = () => {
  let [user, setUser] = useState([])
  useEffect(()=>{
    fetch(`${API_BASE_URL}/users.php`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Error fetching users:', err))
  }, [])
  console.log(user);

  function deleteFromUser(id,name)
    {
      let y = window.confirm(`Do you want to remove ${name} from users?`)
      if(y)
      {
        fetch(`${API_BASE_URL}/users.php?id=${id}`, {
          method:"DELETE",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (!res.ok) return res.text().then(t => { throw new Error(t || res.statusText) })
          return res.json()
        })
        .then(data => {
          alert(`${name} user is removed from users`)
          // Refresh the user list
          fetch(`${API_BASE_URL}/users.php`)
            .then(res => res.json())
            .then(data => setUser(data))
        })
        .catch(err => {
          console.error('Error deleting user:', err)
          alert('Error deleting user: ' + (err.message || err))
        })
      }
    }
  
  return (
    <div>
      <center>
        <h1>users</h1>
        <div className="users">
          {user?.map((a)=>{
            return(
              <div className="user-cards">
                <h3>id: {a.id}</h3>
                <h3>Name: {a.firstName} {a.lastName}</h3>
                <h3>Email: {a.email}</h3>
                <h3>Phone: {a.phone}</h3>
                <h3>Address: {a.address}</h3>
                <h3>DOB: {a.birthDate}</h3>
                <br /><br />
                <button onClick={()=>{
                  deleteFromUser(a.id, a.firstName)
                }}>Delete User</button>
              </div>
            )
          })}
        </div>
      </center>
    </div>
  )
}

export default Users
