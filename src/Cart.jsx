import { useEffect, useState } from "react"
import API_BASE_URL from './config/api'

const Cart = () => {
  let[cart, setCart] = useState([])
    useEffect(()=>{
      fetch(`${API_BASE_URL}/cart.php`)
        .then(res => res.json())
        .then(data => setCart(data))
        .catch(err => console.error('Error fetching cart:', err))
    }, [])
    console.log(cart);

    function removeFromCart(id,title)
    {
      let y = window.confirm(`Do you want to remove ${title} from the cart`)
      if(y)
      {
        fetch(`${API_BASE_URL}/cart.php?id=${id}`, {
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
          alert(`${title} book is removed from the cart`)
          // Refresh the cart
          fetch(`${API_BASE_URL}/cart.php`)
            .then(res => res.json())
            .then(data => setCart(data))
        })
        .catch(err => {
          console.error('Error removing from cart:', err)
          alert('Error removing from cart: ' + (err.message || err))
        })
      }
    }

    
  return (
    <div>
        <center>
        <h1>Cart</h1>
        <table border="2px" rules="all" cellPadding="20px">
          <thead>
            <tr>
            <th>Cart Id </th>
            <th>Book Id</th>
            <th>Book Title</th>
            <th>Image</th>
            <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((a)=>{
              return(
                <tr>
                <td>{a.id}</td>
                <td>{a.cartid}</td>
                <td>{a.carttitle}</td>
                <td><img src={a.cartimage} alt="" height="100px" width="100px"/></td>
                <td>
                  <button onClick={()=>{
                    removeFromCart(a.id, a.carttitle)
                  }}>Remove</button>
                  </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        </center>
    </div>
  )
}
//id title image price
export default Cart
