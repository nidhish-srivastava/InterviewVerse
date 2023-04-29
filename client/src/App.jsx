import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import GetAllPosts from './posts/GetAllPosts'
import CreatePost from './posts/CreatePost'
import Header from './Header'

const App = () => {
  return (
    <Router>
      <Header/>
    <h2 className='logo'>Interview Tracker</h2>
      <Routes>
      <Route path='/' element = {<GetAllPosts/>} />
      <Route path='/create' element = {<CreatePost/>} />
      </Routes>
    </Router>
  )
}

export default App