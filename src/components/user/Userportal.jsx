import { Route, Routes } from "react-router-dom"
import Home from "../../Home"
import About from "../../About"
import Book from "../../Book"
import Navbar from "../../Navbar"
import Readbook from "../../Readbook"
import Cart from "../../Cart"

const Userportal = () => {
  return (
    <div>
        <center>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/book" element={<Book/>}/>
                <Route path="/readbook/:id" element={<Readbook/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
            </Routes>
        </center>
      
    </div>
  )
}

export default Userportal
