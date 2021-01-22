import './App.css';
import Main from './components';
import {Navbar,Button} from "react-bootstrap";
function App() {
  return (
    <div >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <div className="container">
  <Navbar.Brand href="#home">Online Compiler</Navbar.Brand>
  </div>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <div className="container">
  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
     <Button variant="secondary">Login</Button>
  </Navbar.Collapse>
  </div>
</Navbar>
  <br></br>
      <Main/>      
    </div>
    );
}
export default App;
