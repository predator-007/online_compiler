import './App.css';
import Main from './components';
import {Navbar,Button} from "react-bootstrap";
import { BrowserRouter ,Route } from 'react-router-dom';
import {provider,auth} from './index';
import {useDispatch,useSelector} from 'react-redux';
import { useraction } from './react-redux/actions';
import { useEffect } from 'react';
function App(){
  const dispatch=useDispatch();  
  const user=useSelector(state=>state.userred);
  const logout=()=>{
    auth.signOut().then(res=>console.log("logged out successfull"))
    .catch(err=>console.log(err));
    localStorage.clear();
    dispatch(useraction(null));
  }

  const login=()=>{
      auth.signInWithPopup(provider)
  .then((result) => {
    var user = result.user.displayName;
    dispatch(useraction(user));
    localStorage.setItem("user",user);
  }).catch((error) => {
    console.log(error)
  });
    }
    useEffect(()=>{
      const User=localStorage.getItem('user')
      if(user===null && User)
      {
          dispatch(useraction(User));
      }
    },[]);
  return (
    <div >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <div className="container">
  <Navbar.Brand href="#home">Online Compiler</Navbar.Brand>
  </div>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  
  <div className="container">
  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    {
    user?
      <Navbar.Text >
      <span id="A">Sign in as : </span> <span id="B"> {user}</span>
       </Navbar.Text> 
       
       :
       <Navbar.Text>
      </Navbar.Text> 
        
    }
     { user?
      <Button variant="primary" onClick={()=>{logout()}}>Logout</Button>
     : 
     <Button variant="secondary" onClick={()=>{login()}}>Login</Button>
     }
     </Navbar.Collapse>
    </div>
  </Navbar>
  <br></br>
      <BrowserRouter>
      <Route path="/" exact component={Main}></Route>
      </BrowserRouter>
    </div>
    );

}
export default App;
