import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
  return (
    <Router>
       <Link to="/login">Login</Link> {/* This will navigate to the Login route */}
       <h2 className='text-center'>Welcome To The</h2>
       <h2 className='text-center'>Local Artisan Market</h2>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/Signup' element={<Signup />} />
      </Routes>
    </Router>
    
  );
}

export default App;




