const savedcodered=(state=[],action)=>{
    if(action.type==="savedcode")
    {
        const data=action.payload;
        return data;
    }
    else
    return state;
}
export default savedcodered;