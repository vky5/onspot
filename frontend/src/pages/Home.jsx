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
      <div className="pt-6">
        <div className="px-4">
        <ul className="flex list-none space-x-7 scrollbar overflow-auto text-xs font-medium" style={{ scrollbarWidth: 'none' }}>
          <li>Latest</li>
          <li>Trending</li>
          <li>Blockhain</li>
          <li>AI</li>
          <li>Netorking</li>
        </ul>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
