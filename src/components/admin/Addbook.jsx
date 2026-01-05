import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '../../config/api'

const Addbook = () => {

  let title = useRef()
  let isbn = useRef()
  let pagecount = useRef()
  let img = useRef()
  let auth = useRef()
  let desc = useRef()

  let nav = useNavigate()

  function addBook(e)
  {
    e.preventDefault()
    // Parse authors string into array
    const authorsArray = auth.current?.value ? auth.current.value.split(',').map(a => a.trim()) : []
    
    let addBooktoDB = {
      title: title.current?.value,
      isbn: isbn.current?.value,
      pageCount:  pagecount.current?.value,
      thumbnailUrl: img.current?.value,
      authors: authorsArray,
      longDescription: desc.current?.value
    }
    let y = window.confirm(`Do you want to add ${title.current?.value} book?`)
    if(y)
    {
      fetch(`${API_BASE_URL}/books.php`, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(addBooktoDB)
      })
      .then(res => {
        if (!res.ok) return res.text().then(t => { throw new Error(t || res.statusText) })
        return res.json()
      })
      .then(data => {
        alert(`${title.current?.value} book is added to books`)
        nav(`/adminportal/book`)
      })
      .catch(err => {
        console.error('Error adding book:', err)
        alert('Error adding book: ' + (err.message || err))
      })
    }
  }

  return (
    <div>
      <center>
        <h1>Add New Book</h1>
        <div className="addbook">
          <form action="" onSubmit={addBook}>
            <br /><br />
            <label htmlFor="">Enter Book Title: </label>
            <input type="text" placeholder='title' ref={title}/>
            <br /><br />
            <label htmlFor="">Enter Isbn: </label>
            <input type="number" placeholder='isbn' ref={isbn}/>
            <br /><br />
            <label htmlFor="">Enter Page Count: </label>
            <input type="number" name="" id="" placeholder='Page Count' ref={pagecount}/>
            <br /><br />
            <label htmlFor="">Enter the image url: </label>
            <input type="text" placeholder='Image url'ref={img}/>
            <br /><br />
            <label htmlFor="">Enter the Authors: </label>
            <input type="text" placeholder='authors' ref={auth}/>
            <br /><br />
            <label htmlFor="">Enter the Description: </label>
            <textarea name="" id="" placeholder='description' ref={desc}></textarea>
            <br /><br />
            <button >Submit</button>
          </form>
        </div>
      </center>
    </div>
  )
}

export default Addbook
