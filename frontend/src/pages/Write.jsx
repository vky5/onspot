import { useEffect, useState } from "react";
import Textar from "../components/Textar";
// import MarkdownRenderer from "../utils/MarkDownRenderer";
import markdownIt from "markdown-it"; //using markdownIt because it is much more safe
// import './write.css'

function Write() {


  const [markdown, setMarkdown] = useState('##### Hello, Markdown!');
  // const md = new MarkdownRenderer();

  const md = new markdownIt();
  useEffect(()=>{
    function updateMD(){
      let newDiv = document.createElement('div');
      newDiv.innerHTML = md.render(markdown);

      const ele = document.getElementById('home');
      ele.innerHTML = "";
      ele.appendChild(newDiv);
    }

    updateMD();
    
  }, [markdown])

  return (
    <div className="min-w-full md:flex space-x-7 min-h-screen">
      <div className="flex flex-col items-center ">
        <Textar handleChange={setMarkdown}/>
      </div>
      <div className="" id="home"/> 
    </div>
  );
}

export default Write;