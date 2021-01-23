export const outputaction=(res)=>{
    return{
        type:"res",
        payload:res
    }
}
export const inputaction=(res)=>{
    localStorage.setItem("input",res);
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
    localStorage.setItem("theme",res);
    return{
        type:"theme",
        payload:res
    }
}
export const langaction=(res)=>{
    localStorage.setItem("lang",res);
    return{
        type:"lang",
        payload:res
    }
}
export const savedcodeaction=(res)=>{
    return{
        type:"savedcode",
        payload:res
    }
}
export const sourcecodeaction=(res)=>{
    localStorage.setItem("sourcecode",res);
    return{
        type:"sourcecode",
        payload:res
    }
}
export const useraction=(res)=>{
    return{
        type:"user",
        payload:res
    }
}