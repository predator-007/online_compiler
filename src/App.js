import './App.css';
import Main from './components';
import {Navbar,Button, Nav} from "react-bootstrap";
import { BrowserRouter ,Route } from 'react-router-dom';
import Privateroute from './components/Privateroute';
import Savedcode from './components/savedcode';
function App() {
  
  return (
    <div >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <div className="container">
  <Navbar.Brand href="#home">Online Compiler</Navbar.Brand>
  </div>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Nav className="mr-auto">
      <Nav.Link href="/savedcode">Saved code</Nav.Link>
    </Nav>
  <div className="container">
  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
     <Button variant="secondary">Login</Button>
    </Navbar.Collapse>
    </div>
  </Navbar>
  <br></br>
      <BrowserRouter>
      <Route path="/" exact component={Main}></Route>
      <Privateroute path="/savedcode"  component={Savedcode} />      
      </BrowserRouter>
    </div>
    );
}
export default App;
