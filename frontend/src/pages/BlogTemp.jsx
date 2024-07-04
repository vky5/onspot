// this is the page for blogs 

import { useContext} from "react"
import { ModeContext } from "../main";
import { useLocation } from "react-router-dom";


function BlogTemp() {
  const {mode} = useContext(ModeContext);
  const location = useLocation();

  const {id} = location.state || {};

  return (
    <div className={`${mode==='light'?'text-black bg-white': 'text-white bg-black'}`}>
      <div className="ml-2 mr-2 ">
        
      </div>
    </div>
  )
}

export default BlogTemp
