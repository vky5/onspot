import BlogCard from "../components/BlogCard"

function Liked() {
  return (
    <div className="bg-gray-100 pb-6">
      <div className="font-bold text-[30px] ml-5">
        LIKED
      </div>

      <div className="space-y-3 mt-3">
        <div className="bg-primary rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2">
          <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" bgColor="primary"/>
        </div>
        <div className="bg-primary rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2">
          <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" bgColor="primary" />
        </div>
        <div className="bg-primary rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2">
          <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" bgColor="primary"/>
        </div>
      </div>
    </div>
  )
}

export default Liked
