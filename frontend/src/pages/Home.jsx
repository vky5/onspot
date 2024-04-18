import MyCarousel from '../components/MyCarousel'
import BlogCard from '../components/BlogCard'


function Home() {
  return (
    <div className="px-2">
      <div 
        className="text-sm md:text-lg lg:text-lg xl:text-2xl text-center mt-2 mb-2 md:mt-3 md:mb-3 xl:mt-4 xl:mb-4 text-slate font-bold"
      >
        Latest Blogs
      </div>
      <div 
        className=""
      >
        <MyCarousel />
      </div>
      <div className='space-y-2'>
      <BlogCard />
      <BlogCard/>
      <BlogCard />
      <BlogCard/>
      </div>
    </div>
  );
}

export default Home;
