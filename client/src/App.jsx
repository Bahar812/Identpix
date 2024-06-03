import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import AlbumDetail from './pages/AlbumDetail';
import Profile from './pages/Profile';
import { useState } from 'react';
import UploadAlbum from './pages/UploadAlbum';
import RedirectPage from './pages/RedirectPage';

function App() {

  const [userId, setUserId] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<RedirectPage />} />
          <Route path={`/home/:userId`} element={<Homepage />} />
          <Route path='/login' element={<Login user_id={setUserId} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/upload-album/:userId' element={<UploadAlbum />} />
          <Route path='/album-detail/:userId/:albumId' element={<AlbumDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
