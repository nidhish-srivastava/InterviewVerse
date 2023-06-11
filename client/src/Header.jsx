import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
    <nav className='nav-bar'>
      <Link to={`/`}>Home</Link>
      <Link to={`/create`}>Create Post</Link>
      <Link to={`my-post`}>My Interviews</Link>
    </nav>
    </header>
  )
}

export default Header