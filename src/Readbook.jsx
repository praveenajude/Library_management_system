import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import "./../src/styles/Readbook.css"
import API_BASE_URL from './config/api'

const Readbook = () => {
  let readid = useParams()
  console.log(readid);
  
  let[book, setBook] = useState({})
    useEffect(()=>{
      let x = fetch(`${API_BASE_URL}/books.php?id=${readid.id}`)
      let y = x.then((a)=>{
        return a.json()
      })
      y.then((b)=>{
        setBook(b)
      })
    },[readid.id])
    console.log(book);

    let move = useNavigate()
    let a = useLocation()
    let b = a.pathname.startsWith("/adminportal")
    function gobackto()
    {
      if(b)
      {
        move(`/adminportal/book`)
      }
      else{
        move(`/userportal/book`)
      }
    }

    // function cart()
    // {
    //   if(b)
    //   {
    //     move(`/adminportal/cart`)
    //   }
    //   else{
    //     move(`/userportal/cart`)
    //   }
    // }
    let[cart, setCart] = useState([])
    useEffect(()=>{
      fetch(`${API_BASE_URL}/cart.php`)
        .then(res => res.json())
        .then(data => setCart(data))
        .catch(err => console.error('Error fetching cart in Readbook:', err))
    }, [])
    console.log(cart);

    let allcartids=  cart.map((ele)=>
    {
       return ele.cartid
    })
    console.log(allcartids);//[]
    

    function addToCart(id, title, image)
    {
      let booktocart = {
        cartid: id,
        carttitle: title,
        cartimage: image
      }
     console.log(id);
     
      if(allcartids.includes(id))
      {
        alert(`Book ${book.title} is already in the cart`)
      }
      else{
        fetch(`${API_BASE_URL}/cart.php`, {
          method:"POST", 
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(booktocart)
        })
        .then(res => {
          if (!res.ok) return res.text().then(t => { throw new Error(t || res.statusText) })
          return res.json()
        })
        .then(data => {
          alert(`Book ${book.title} has been added to the cart`)
          move(`/userportal/cart`)
        })
        .catch(err => {
          console.error('Error adding to cart:', err)
          alert('Error adding to cart: ' + (err.message || err))
        })
      }
    }
    
  return (
    <div>
      <center>
        <div className="book-read">
          <div className="book-details">
            <h3>id: {book.id}</h3>
            <h3>title: {book.title}</h3>
            <h3>Authors: {book.authors}</h3>
            <img src={book.thumbnailUrl} alt="" height="200px" width="200px"/>
            <p>
              Description: {book.longDescription}
            </p>
            <br /><br />
            <button className="read-btn" onClick={()=>{
              addToCart(book.id, book.title, book.thumbnailUrl)
            }}>Add to cart</button>
            <br /><br />
            <button className="read-btn" onClick={gobackto}>Go back</button>
            
          </div>
        </div>
      </center>
      
    </div>
  )
}

export default Readbook
