import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import GetAllPosts from './posts/GetAllPosts'
import CreatePost from './posts/CreatePost'
import Header from './Header'
import UpdatePost from './posts/UpdatePost'
import MyPosts from './posts/MyPosts'
const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path='/' element = {<GetAllPosts/>} />
      <Route path='/create' element = {<CreatePost/>} />
      <Route path='/update' element = {<UpdatePost/>} />
      <Route path='/my-post' element = {<MyPosts/>} />
      </Routes>
    </Router>
  )
}

export default App