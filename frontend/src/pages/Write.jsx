import { useEffect, useState } from "react";
import Textar from "../components/Textar";
// import MarkdownRenderer from "../utils/MarkDownRenderer";
import markdownIt from "markdown-it"; //using markdownIt because it is much more safe

function Write() {
  const [markdown, setMarkdown] = useState('##### Hello, Markdown!');
  // const md = new MarkdownRenderer();
  const md = new markdownIt();

  useEffect(()=>{
    function fun(){
      console.log(md.render(markdown))
    }
    fun()
  }, [markdown])
  return (
    <div className="min-w-full md:flex space-x-7 min-h-screen">
      <div className="flex flex-col items-center ">
        <Textar handleChange={setMarkdown}/>
      </div>
      <div className="" id="home ml-30"> 
        <div dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
      </div>
    </div>
  );
}

export default Write;
