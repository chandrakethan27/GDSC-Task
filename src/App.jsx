import './App.css';
import { Routes, Route} from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import EventCreate from './components/EventCreate';
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/' element={<LoginPage/>} />
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/event' element={<HomePage/>} />
        <Route path='*' element={<h1>404 not found</h1>} />
        <Route path='/create' element={<EventCreate/>} />
      </Routes>
    </div>
  );
}

export default App;
