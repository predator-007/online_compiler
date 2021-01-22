export const outputaction=(res)=>{
    return{
        type:"res",
        payload:res
    }
}
export const inputaction=(res)=>{

    return{
        type:"inp",
        payload:res
    }
}
export const outputstatusaction=(res)=>{
        return{
            type:"opstatus",
            payload:res
        }
}
export const themeaction=(res)=>{
    return{
        type:"theme",
        payload:res
    }
}
export const langaction=(res)=>{
    return{
        type:"lang",
        payload:res
    }
}