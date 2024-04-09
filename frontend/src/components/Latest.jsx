

function Latest() {
  return (
    <div className="flex text-white">
      <img 
        src="https://www.crn.com/news/security/media_1b1914148e388f14cd27aaa27a059acec3fa8f3dc.jpeg?width=2000&format=webply&optimize=medium" 
        alt="image" 
        className="w-2/5"
      />

      <div  className="px-4 md:px-6">
        <h1>
          Title
        </h1>
        <h3 className="bg-gray-800">
          Date
        </h3>
      </div>
    </div>
  )
}

export default Latest
