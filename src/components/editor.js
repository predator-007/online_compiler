import { React} from "react";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/ext-language_tools";
import  {useSelector } from "react-redux";
const Editor=({
    setsourcecode,
})=>{
    const handlesourcecode=(newvalue)=>{
        setsourcecode(newvalue);
    }
    const obj={
        "C":"c_cpp",
        "C++14":"c_cpp",
        "Python":"python",
    }
    const theme=useSelector(state=>state.themered);
    const lang=useSelector(state=>state.langred);     
    return(
        <AceEditor
        mode={obj[lang]}
        fontSize="1.1rem"
        theme={theme==="light"?"dreamweaver":"twilight"}
        onChange={handlesourcecode}
        showGutter={true}
        highlightActiveLine={true}
        name="editor"
        width="100%"
        height="450px"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4
          }}
        />   
    );
}
export default Editor;