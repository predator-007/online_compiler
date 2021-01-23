const inputred=(state="",action)=>{
    if(action.type==="inp")
    {
        const str=action.payload;
        return str;
    }
    else{
        return state;
    }
}
export default inputred;