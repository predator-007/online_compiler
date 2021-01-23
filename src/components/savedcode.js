import {Button,Table} from 'react-bootstrap';
import { useDispatch,useSelector } from "react-redux";
import db from '../index';
import { inputaction,sourcecodeaction } from '../react-redux/actions';
const Savedcode=({handlesavedcode,setmainopen,mainopen})=>{
    const dispatch=useDispatch();
    const codes=useSelector(state=>state.savedcodered);
    const handledeletedoc=(id)=>{
        db.collection('code').doc(id).delete()
        .then(()=>console.log("delted sucessfully"))
        .catch((err)=>console.log("error in deleting doc"));
        handlesavedcode();
    }
    const handle=(res,inp)=>{
        dispatch(inputaction(inp));
        dispatch(sourcecodeaction(res));
        setmainopen(!mainopen);
    }
    return(
        <Table responsive style={{color: "white",
        textAlign: "center",fontSize:"large"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>language</th>
            <th>Output status</th>
            <th>Date</th>
            <th>Run</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
        {    
            codes.map(code=>(
            <tr style={{ height: "15vh" }}>
            <td>{code.name}</td>
            <td>{code.lang}</td>
            <td>{code.opstatus}</td>
            <td>{code.date}</td>
            <td><Button className="secondary" onClick={()=>{handle(code.sourcecode,code.input)}}>Run</Button></td>
            <td><Button className="Danger" onClick={()=>{handledeletedoc(code.id)}}>del</Button></td>
            </tr>
            ))
            }
        </tbody>
      </Table>
    );
}
export default Savedcode;