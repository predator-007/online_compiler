import { combineReducers } from 'redux';
import compilereducer from './compile';
import inputred from "./input";

const opstatusred=(state="",action)=>{
    if(action.type==="opstatus"){
        const str=action.payload;
        return str;
    }
    else{
        return state;
    }
}
const themered=(state="dark",action)=>{
    if(action.type==="theme")
    {
        const str=action.payload;
        return str;
    }
    else{
        return state;
    }
}
const langred=(state="Python",action)=>{
    if(action.type==="lang")
    {
        const str=action.payload;
        return str;
    }
    else{
        return state;
    }
}
const allreducers=combineReducers({
    inpred:inputred,   
    cmpred:compilereducer,
    opstatusred,
    themered,
    langred,
});


export default allreducers;

