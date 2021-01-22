const inputred=(state="",action)=>{
    if(action.type==="inp")
    {
        const obj=action.payload;
        return {
            obj
        }
    }
    else{
        return state;
    }
}
export default inputred;