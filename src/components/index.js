import { React,useState } from "react";
import  Container  from "react-bootstrap/Container";
import { Row,Col,Button } from "react-bootstrap";
import Editor from "./editor";
import Input from "./input";
import Output from "./output";
import Axios from 'axios';
import { useSelector,useDispatch } from "react-redux";
import { langaction, outputaction } from "../react-redux/actions";
import Spinner from 'react-bootstrap/Spinner';
import  Dropdown from "react-bootstrap/Dropdown";
import Collapse from "@material-ui/core/Collapse";
import {themeaction} from '../react-redux/actions';
import db from '../index'; 
const Main=()=>{
    const [sourcecode,setsourcecode]=useState(null);
    const [open,setopen]=useState(true);
    const dispatch=useDispatch();
    const [isloading,setloading]=useState(false);
    const input=useSelector(state=>state.inpred);
    const status=useSelector(state=>state.opstatusred);
    const theme=useSelector(state=>state.themered);
    const lang=useSelector(state=>state.langred);
    const res=useSelector(state=>state.cmpred);
    const obj={
        "Python": "24",
        "C++14": "7",
         "C":"26",
    }
    const args={
            "C++14": "-Wall -std=c++14 -O2 -o a.out source_file.cpp",
            "C": "-Wall -std=gnu99 -O2 -o a.out source_file.c",
            "Python":"",
          }
    const get =async ()=>{
        return Axios({
        method :"post",
        headers:{"content-type": "application/json"},
        url:'https://cors-anywhere.herokuapp.com/https://rextester.com/rundotnet/api',
        data:JSON.stringify({
            LanguageChoice :obj[lang],
            Program:  sourcecode,
            Input: input,
            CompilerArgs:args[lang],
         }),
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (err) {
            console.log(err);
        });
    }
    const handlesubmit=async ()=>{
        setloading(true);
        const data= await get();
        console.log(data);
        dispatch(outputaction(data));
        setloading(false);
    }
    const savecode=()=>{
        const name=prompt("Enter the name of code");
        const date=new Date();
        if(name){
        db.collection('code').add({
            name:name,
            ...res,
            input:input,
            opstatus:status,
            lang:lang,
            date:date.getDate(),
            time:date.getTime(),
        })
        }
    }
return(
<Container>
    <Row>
    <Col sm="12" md="10" className="editor">
    <Editor 
    setsourcecode={setsourcecode}
    />
    </Col>
    <Col sm="12" md="2"  className="d-flex order-direction justify-content-evenly">
        <div className="container">
        <Dropdown>
        <Dropdown.Toggle
        variant="outline-danger"
        >{lang}</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={()=>dispatch(langaction("C"))}>C</Dropdown.Item>
            <Dropdown.Item onClick={()=>dispatch(langaction("C++14"))}>C++14</Dropdown.Item>
            <Dropdown.Item onClick={()=>dispatch(langaction("Python"))}>Python</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        </div>
        <div className="container">
        <Dropdown>
        <Dropdown.Toggle
        variant="outline-info"
        >{theme}</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={()=>dispatch(themeaction("light"))}>Light</Dropdown.Item>
            <Dropdown.Item onClick={()=>dispatch(themeaction("dark"))}>Dark</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        </div>
        <div className="container">
            <Button variant="outline-info" onClick={()=>savecode()}>Save code</Button>
        </div>
    </Col>        
    </Row>
    <br></br>
    <Row>
    <Col sm="12" md="10">
        <Row>
        <Col >
        
        <div className="d-flex flex-row  mb-3">
        <div className="p-2">
        <Dropdown.Toggle variant="light" onClick={()=>{setopen(!open)}}>Input</Dropdown.Toggle>
        </div>
        </div>
        </Col>
        <Col>
        <div className="d-flex flex-row-reverse">
        <div className="p-2">
        <Button
        variant="success"
        onClick={()=>handlesubmit()}
        >Submit</Button></div></div>
        </Col>
        </Row>
    </Col>
    </Row>
    <br></br>
    <Row>
        <Col sm="12" md="10">
        <Collapse in={open}>
        <Input/>
        </Collapse>
        </Col>
    </Row>
    <Row>
    <pre style={{ color: "white",
              margin: "0",
              fontFamily: "Josefin Sans",
              fontSize: "xx-large",}}>Output</pre>
        <br></br>
        <h5 style={{ color: status === "Success" ? "green" : "red" }}>
          {status}
        </h5>    
        <br></br>
        <Col sm="12" md="10" style={
        {
            display: "inline-block",
            border:"2px solid white",
            borderRadius:"10px",
        }}>
        {isloading?
        <div className="row justify-content-center">
        <span>loading</span>
        <Spinner animation="border" variant="success" />
        </div>
        :<Output/>}
        </Col>
    </Row>
    <br></br>
</Container>

);
}
export default Main;