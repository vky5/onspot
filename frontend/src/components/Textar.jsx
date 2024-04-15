import PropTypes from 'prop-types';

function Textar(props) {
  const updateMarkDown = (event)=>{
    props.handleChange(event.target.value);
  }
  
  return (
    <div className='flex flex-col items-center w-11/12'>
      <div className="flex flex-col items-center w-full">
        <input 
          type="text" 
          className="h-8 outline-none p-2 text-xl w-full"
          placeholder="Enter text..."
        />
        <input 
          type="file"
          className="mt-2"
        />
      </div>
      <div className="w-full">
        <textarea 
          name="blogInput" 
          id="" 
          onChange={updateMarkDown}
          className="w-full border outline-none p-2 text-xl"
          placeholder="Enter your blog here..."
        />
      </div>
    </div>
  );
}

Textar.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Textar;
