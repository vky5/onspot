import profile from '../assets/profile.png';
import BlogCard from '../components/BlogCard';


function Blogs() {
  return (
    <div className="bg-gray-100 pb-6">
      <div className="font-bold text-[30px] ml-2 mr-2">
        BLOGS
      </div>
      <div className='pb-3 flex space-x-4 mt-2 pl-2 overflow-x-auto' style={{ scrollbarWidth: "none" }}>
        <div className='flex flex-col items-center h-16 w-28'>
          <img src={profile} alt="" className="h-16 w-16" />
          <div className='text-xs'>
            Username
          </div>
        </div>
        <div className='flex flex-col items-center h-16 w-28'>
          <img src={profile} alt="" className="h-16 w-16" />
          <div className='text-xs'>
            Username
          </div>
        </div>
        <div className='flex flex-col items-center h-16 w-28'>
          <img src={profile} alt="" className="h-16 w-16" />
          <div className='text-xs'>
            Username
          </div>
        </div>
        <div className='flex flex-col items-center h-16 w-28'>
          <img src={profile} alt="" className="h-16 w-16" />
          <div className='text-xs'>
            Username
          </div>
        </div>
        <div className='flex flex-col items-center h-16 w-28'>
          <img src={profile} alt="" className="h-16 w-16" />
          <div className='text-xs'>
            Username
          </div>
        </div>
        <div className='flex flex-col items-center h-16 w-28'>
          <img src={profile} alt="" className="h-16 w-16" />
          <div className='text-xs'>
            Username
          </div>
        </div>
      </div>
      <div className="space-y-3 mt-3">
        <div className="bg-white rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2">
          <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" />
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2">
          <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" />
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2">
          <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" />
        </div>
      </div>
    </div>
  );
}

export default Blogs;
