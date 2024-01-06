import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home"
import UserLogin from './user/UserLogin'
import Registration from "./user/Register"
import ManageSports from "./user/ManageSports"
import AdminLogin from "./admin/AdminLogin"
import AdminDashboard from './admin/AdminDashboard';
import LogOut from './LogOut';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        <Router>
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path="/logout" element={<LogOut />} exact/>
          <Route path='/user/login' element={<UserLogin/>} exact />
          <Route path='/user/registration' element={<Registration/>} exact />
          <Route path='/user/managesports' element={<ManageSports/>} exact />
          <Route path='/admin/login' element={<AdminLogin/>} exact />
          <Route path='/admin/dashboard' element={<AdminDashboard/>} exact />
        </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
