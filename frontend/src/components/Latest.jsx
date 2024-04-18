import formatDate from "../utils/dateFormat";
import formatTxt from "../utils/formatTxt";


function Latest() {
  

  return (
    <div>
      <div className="flex w-full min-h-32 justify-center text-gray-900 bg-bgBlog pr-2">
        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 ml-2 h-30 flex flex-col justify-evenly">
          <div className="text-xs">this is the heading of a blog</div>
          <div className="text-xs flex justify-between">
            <span className="text-emerald">{formatDate(Date.now())}</span>
            <span className="text-gray-900">🍁 3</span>
            <span>
              <span className="text-slate">VKY</span>
            </span>
          </div>
          <div className="text-xs pr-2">
            {formatTxt(
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas provident alias dolor veritatis atque aperiam laborum, est expedita minus laboriosam accusantium quia similique aspernatur iure culpa modi quod esse, error recusandae molestiae.",
              32
            )}
          </div>
          <button className="bg-emerald px-1 py-1 text-gray-100 text-xs">
            Read More
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Latest;
