import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './containers/home';
import './css/templatemo-style.css';
import './css/responsive.css';
import React ,{Component} from 'react'
function App() { 
  return (
    
  <Router>
    <Home/>
  </Router>


  );
}
export default App
//export default withAuthenticator(App);
