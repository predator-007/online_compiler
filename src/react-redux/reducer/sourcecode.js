import temp from '../../components/template';
const sourcodered=(state=temp["Python"],action)=>{
    if(action.type==="sourcecode")
        return action.payload;
    else
        return state;

}
export default sourcodered;