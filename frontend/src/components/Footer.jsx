function Footer() {
    return (
      <div className='p-4 mt-10 text-white bg-white rounded-3xl bg-opacity-20 drop-shadow-sm w-11/12'>
        <div className="flex items-center justify-between">
          <h1 className="flex-grow text-xs md:text-3xl lg:text-4xl xl:text-5xl">
            Be the first to receive exclusive updates!
          </h1>
          <div className="flex-shrink-0 ml-4">
            <input type="text" name="user_email" id="signupemail" className="w-3/3 md:w-64 lg:w-64 xl:w-80 text-blue-900 px-2 py-1 md:text-lg lg:text-xl xl:text-2xl"/>
          </div>
        </div>
      </div>
    )
  }
  
  export default Footer
  