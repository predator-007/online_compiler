const userred=(state=null,action)=>{
    if(action.type==="user"){
        return action.payload;
    }
    else
    return state;
}
export default userred;