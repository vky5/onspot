import PropTypes from 'prop-types';

import stripText from "../utils/textStrip";


function BlogCard(props) {
  return (
    <div className="bg-white flex pt-4 pb-4">
        <div className="">
          <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" className="rounded-xl h-[107px] w-[105px]"/>
        </div>
        <div className="text-[13px] ml-2 mr-2 text-left">
            {stripText(props.heading)}
        </div>
        <div>
            <img src="" alt="" />
        </div>
    </div>
  );
}


BlogCard.propTypes = {
    heading: PropTypes.string.isRequired,
  };
  

export default BlogCard;
