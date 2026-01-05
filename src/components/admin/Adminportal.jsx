import { Route, Routes } from "react-router-dom"
import Home from "../../Home"
import About from "../../About"
import Users from "./Users"
import Addbook from "./Addbook"
import Adduser from "./Adduser"
import Navbar from "../../Navbar"
import Book from "../../Book"
import Readbook from "../../Readbook"
import Cart from "../../Cart"


const Adminportal = () => {
  return (
    <div>
        <center>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/users" element={<Users/>}></Route>
                <Route path="/book" element={<Book/>}></Route>
                <Route path="/addbook" element={<Addbook/>}></Route>
                <Route path="/adduser" element={<Adduser/>}></Route>
                <Route path="/readbook/:id" element={<Readbook/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
            </Routes>
        </center>
      
    </div>
  )
}

export default Adminportal
