import BlogCard from "../components/BlogCard"

import { useContext } from "react"
import { ModeContext } from "../main"

function Profile() {
  const {mode} = useContext(ModeContext);

  return (

    
    <div className={`${mode==='light'? 'bg-gray-100 text-black': 'bg-priDark text-white'} duration-200 pb-6`}>
      <div className="font-bold text-[30px] ml-5">
        LIKED
      </div>

      <div className="space-y-3 mt-3">
          <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique"/>
          <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" />
          <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique"/>
      </div>
    </div>
  )
}

export default Profile;
