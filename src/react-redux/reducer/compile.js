const initial={
    Result:"No",
    Warnings:"No",
    Errors:"No",
    Stats:"No",
    Files:"No",
    NotLoggedIn:"No"
}
const compilereducer=(state=initial,action)=>{
    if(action.type==="res")
    {
        const obj=action.payload;
        return{
            ...obj,
    Result:action.payload.Result,
    Warnings:action.payload.Warnings,
    Errors:action.payload.Errors,
    Stats:action.payload.Stats,
    Files:action.payload.Files,
    NotLoggedIn:action.payload.NotLoggedIn
        }
    }
    else{
        return state;
    }
}
export default compilereducer;