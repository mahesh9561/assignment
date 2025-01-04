import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './controller/Dashboard';
import Header from './controller/Header';
import Login from './controller/Auth/Login';
import Register from './controller/Auth/Register';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashbord' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
