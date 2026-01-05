import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./styles/Book.css"
import API_BASE_URL from './config/api'

const Book = () => {
  let[book, setBook] = useState([])
  useEffect(()=>{
    fetch(`${API_BASE_URL}/books.php`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error('Error fetching books:', err))
  }, [])
  // console.log(book);

  let nav = useNavigate()

  let loc = useLocation()
  let x = loc.pathname.startsWith("/adminportal")

  function read(id)
  {
    if(x)
    {
      nav(`/adminportal/readbook/${id}`)
    }
    else{
      nav(`/userportal/readbook/${id}`)
    }
  }

  function deleteFromBook(id,title)
    {
      let y = window.confirm(`Do you want to remove ${title} from books?`)
      if(y)
      {
        fetch(`${API_BASE_URL}/books.php?id=${id}`, {
          method:"DELETE",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          alert(`${title} book is removed`)
          // Refresh the book list
          fetch(`${API_BASE_URL}/books.php`)
            .then(res => res.json())
            .then(data => setBook(data))
        })
        .catch(err => {
          console.error('Error deleting book:', err)
          alert('Error deleting book')
        })
      }
    }

  

  return (
    <div>
      <center>
        <h2>Welcome to books</h2>
        <div className="book">
          {book.map((a)=>{
            return(
              <div className="book-cards">
                <h3>id:{a.id}</h3>
                <h3>title: {a.title}</h3>
                <img src={a.thumbnailUrl} alt="" height="200px" width="200px"/>
                <br />
                <button className='book-btn' onClick={()=>{
                  read(a.id)
                }}>Read Book</button>
                <button className='book-btn' onClick={()=>{
                  deleteFromBook(a.id, a.title)
                }}>Delete Book</button>
              </div>
            )
          })}
        </div>
      </center>

    </div>
  )
}

export default Book
