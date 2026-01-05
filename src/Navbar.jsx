import { NavLink, useLocation } from "react-router-dom"
import "./styles/Navbar.css"
import { useEffect, useRef, useState } from "react";
import API_BASE_URL from './config/api'

const Navbar = () => {
    let path = useLocation()
    console.log(path);//pathname: "/adminportal"

    let x = path.pathname.startsWith("/adminportal");
    console.log(x);//true
    
    let[cart, setCart] = useState([])
        useEffect(()=>{
          fetch(`${API_BASE_URL}/cart.php`)
            .then(res => res.json())
            .then(data => setCart(data))
            .catch(err => console.error('Error fetching cart in Navbar:', err))
        }, [])
        console.log(cart);

        
    
    
  return (
    <div>
      {x?
      (
        <div className="nav">
            <NavLink to="/adminportal/" className="text">Home</NavLink>
            <NavLink to="/adminportal/about" className="text">About</NavLink>
            <NavLink to="/adminportal/users" className="text">Users</NavLink>
            <NavLink to="/adminportal/book" className="text">Book</NavLink>
            <NavLink to="/adminportal/adduser" className="text">Add User</NavLink>
            <NavLink to="/adminportal/addbook" className="text">Add Book</NavLink>
            <NavLink to="/" className="text">Logout</NavLink>
        </div>
        
      ):(
        <div className="nav">
            <NavLink to="/userportal/" className="text">Home</NavLink>
            <NavLink to="/userportal/about" className="text">About</NavLink>
            <NavLink to="/userportal/book" className="text">Book</NavLink>
            <NavLink to="/userportal/cart" className="text">Cart({cart.length})</NavLink>
            <NavLink to="/" className="text">Logout</NavLink>
        </div>
      )}
    </div>
  )
}

export default Navbar
