import MyCarousel from "../components/HomeComponents/MyCarousel";
import BlogCard from "../components/BlogCard";

function Home() {
  return (
    <div className="bg-gray-100 pb-6">
      <div className="">
        <div className="flex flex-col text-center pt-6">
          <div className="text-[10px] tracking-widest font-thin">BLACKTREE</div>
          <div className="font-bold text-xl mt-2">Unvelling Stories</div>
          <div className="font-bold text-xl">Branching Perspectives</div>
        </div>
      </div>
      <div className="pt-12">
        {" "}
        {/*here is the css for carousel height in different screen size*/}
        <MyCarousel />
      </div>
      <div className="pt-6">
        <ul
          className="flex px-4 list-none space-x-7 scrollbar overflow-auto text-xs font-medium"
          style={{ scrollbarWidth: "none" }}
        >
          <li>Latest</li>
          <li>Trending</li>
          <li>Blockhain</li>
          <li>AI</li>
          <li>Netorking</li>
          <li>Cyber Security</li>
          <li>System Design</li>
        </ul>
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

export default Home;
