import './App.css';
import './styles/alignment.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import SingleMovie from './pages/SingleMovie';
import BookShow from './pages/BookShow';
import { useSelector } from 'react-redux';


function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <div className="App">
      {
        loading && <div className='loader-container'><div className='loader'></div></div>
      }
      <BrowserRouter>        
          <Routes>
              <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
              <Route path="/movie/:id" element={<ProtectedRoute><SingleMovie/></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
              <Route path="/book-show/:id" element={<ProtectedRoute><BookShow/></ProtectedRoute>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
          </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
