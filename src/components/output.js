import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import {outputstatusaction} from '../react-redux/actions';
const Output=()=>{
    const res=useSelector(state=>state.cmpred);
    const status=useSelector(state=>state.opstatusred);
    const dispatch=useDispatch();
    if (res.message) {
        dispatch(outputstatusaction("Server is busy"));
        return;
      } else {
        if(res.Errors==="No")
        dispatch(outputstatusaction(""));
        else
        dispatch(outputstatusaction(
          res.Errors
            ? res.Errors.substring(0, 4) === "Kill"
              ? "Time Limit Exceeded"
              : "Runtime Error/Compilation Error"
            : "Success"
        ));
      }
return(
    <div className="ouput"
    >
       <pre 
        style={
            { color: "white",
            margin: "0",
            fontFamily: "Josefin Sans",
            fontSize: "large",
            }
        }>
        
        {res.Result==="No"?"Output is empty": status==="Success"?res.Result:res.Errors}
        </pre>
    </div>
);

}
export default Output;