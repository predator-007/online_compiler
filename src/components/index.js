import { React,useEffect,useState} from "react";
import  Container  from "react-bootstrap/Container";
import { Row,Col,Button } from "react-bootstrap";
import Editor from "./editor";
import  temp  from "./template";
import Input from "./input";
import Output from "./output";
import Axios from 'axios';
import Savedcode from './savedcode';
import { useSelector,useDispatch } from "react-redux";
import { savedcodeaction,langaction, outputaction, sourcecodeaction, inputaction } from "../react-redux/actions";
import Spinner from 'react-bootstrap/Spinner';
import  Dropdown from "react-bootstrap/Dropdown";
import Collapse from "@material-ui/core/Collapse";
import {themeaction} from '../react-redux/actions';
import { OverlayTrigger,Tooltip } from "react-bootstrap";
import db from '../index'; 
import './style.css';
const Main=()=>{
    const [open,setopen]=useState(true);
    const dispatch=useDispatch();
    const [mainopen,setmainopen]=useState(true);
    const [isloading,setloading]=useState(false);
    const sourcecode=useSelector(state=>state.sourcecodered);
    const input=useSelector(state=>state.inpred);
    const status=useSelector(state=>state.opstatusred);
    const theme=useSelector(state=>state.themered);
    const lang=useSelector(state=>state.langred);
    const res=useSelector(state=>state.cmpred);
    const user=useSelector(state=>state.userred);
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
        console.log(sourcecode);
        return Axios({
        method :"post",
        headers:{"content-type": "application/json"},
        url:'https://cors-anywhere.herokuapp.com/https://rextester.com/rundotnet/api',
        data:JSON.stringify({
            LanguageChoice :obj[lang],
            Program:sourcecode,
            Input:input,
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
        var currentdate = new Date(); 
        if(name){
        db.collection('code').add({
            name:name,
            author:user,
            ...res,
            input:input,
            opstatus:status,
            lang:lang,
            sourcecode:sourcecode,
            date:currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds(),
        })
        }
    }
    const handlesavedcode=async ()=>{
        var data=[]
        var codeRef = db.collection('code').where("author","==",user);
        try {
            var allCodeSnapShot = await codeRef.get();
            allCodeSnapShot.forEach(doc => {
                data.push({...doc.data(),id:doc.id})
            });
            dispatch(savedcodeaction(data))
        }
        catch (err) {
            console.log('Error getting documents', err);
        }
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Requires Login
        </Tooltip>
        );
        const reset=()=>{
            localStorage.clear();
            dispatch(sourcecodeaction(temp[lang]));
            dispatch(inputaction(""));
        }
        useEffect(()=>{
            const inp=localStorage.getItem("input");
            const scode=localStorage.getItem("sourcecode");
            const lan=localStorage.getItem("lang");
            const them=localStorage.getItem("theme");
            if(inp)
            dispatch(inputaction(inp));
            if(scode)
            dispatch(sourcecodeaction(scode));
            if(lan)
            dispatch(langaction(lan));
            if(them)
            dispatch(themeaction(them));
        },[]);
return(
<Container>
<Collapse in={mainopen}>
<Container>
    <Row>
    <Col sm="12" md="10" className="editor">
    <Editor/>
    </Col>
    <Col sm="12" md="2" id="options">
        <Dropdown >
        <Dropdown.Toggle
        variant="danger"
        >{lang}</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={()=>dispatch(langaction("C"))}>C</Dropdown.Item>
            <Dropdown.Item onClick={()=>dispatch(langaction("C++14"))}>C++14</Dropdown.Item>
            <Dropdown.Item onClick={()=>dispatch(langaction("Python"))}>Python</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown>
        <Dropdown.Toggle
        variant="warning"
        >{theme}</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={()=>dispatch(themeaction("light"))}>Light</Dropdown.Item>
            <Dropdown.Item onClick={()=>dispatch(themeaction("dark"))}>Dark</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        
        <Button variant="danger" onClick={()=>{reset()}}>Reset</Button>
        
        <OverlayTrigger
                placement="top-start"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
                >
            <Button active={user?true:false} variant="primary" onClick={()=>
                {
                    if(user){
                    savecode();
                    }
                }
                }>Save code</Button>
            </OverlayTrigger>
            <OverlayTrigger
                placement="top-start"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
                >
            <Button active={user?true:false} variant="outline-info" onClick={()=>
                { if(user){handlesavedcode();setmainopen(!mainopen)}
                }}>List Code</Button>
            </OverlayTrigger>
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
    </Collapse>
    <Collapse in={!mainopen}>
    <Container>
    <Button variant="secondary" onClick={()=>setmainopen(!mainopen)}>Back</Button>
    <Savedcode handlesavedcode={handlesavedcode}
                setmainopen={setmainopen}
                mainopen={mainopen}/>
    </Container>
    </Collapse>
</Container>
);
}
export default Main;