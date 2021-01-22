import { React} from "react";
import {Form} from 'react-bootstrap';
import { useDispatch} from "react-redux";
import {inputaction} from '../react-redux/actions';
const Input=()=>{
    const dispatch=useDispatch();
    
return(
    <div>
        <Form.Control
        spellCheck={false}
        style={{fontSize: "large"}}
        row={5}
        as="textarea"
        placeholder="Input is empty"
        onChange={(e)=>dispatch(inputaction(e.target.value))}
        >
        </Form.Control>
    </div>

);
}
export default Input;