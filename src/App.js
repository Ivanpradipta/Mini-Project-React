import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Auth/LoginPage';
import Home from './Component/Home';
import Cart from './Component/Cart';
import User from './Component/User';
import Register from './Auth/SignUp';
import History from './Component/History'
import ProtectedRoute from './Routes/ProtectedRoute';
import LandingPage from './Component/LandingPage';


function App() {
  return (
    <>
    <BrowserRouter>
    
      <Routes>
        
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/admin" element={<ProtectedRoute component={Home}/>} />
        <Route path="/user" element={<ProtectedRoute component={User}/>} />
        <Route path="/cart" element={<ProtectedRoute component={Cart}/>} />
        <Route path="/history" element={<History/>} />
        

      </Routes>
    </BrowserRouter>
    </>
)}

export default App;
