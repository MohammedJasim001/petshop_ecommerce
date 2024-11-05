import React from "react";
import { useNavigate } from "react-router";

const SearchResults = ({ results, setInput ,input}) => {
  const navigate = useNavigate();

  function handleClick(details) {
    navigate(`/productdetails/${details._id}`);
    setInput("");
  }

  return (
<div>
    {input!==""&&(
            <div className="flex flex-col items-center text-black overflow-y-auto  inset-0">
      {results?.map((details, id) => {
        return (
          <div
            key={id}
            className="flex items-center justify-between border w-[80%] md:w-[40%]  bg-white z-10 cursor-pointer"
          >
            <div className="ml-2 h-[30px]"
             onClick={() => handleClick(details)}>{details.title}</div>
            <img className="w-[60px] h-[60px]" src={details.image} alt="" />
          </div>
        );
      })}
    </div>
    )}
</div>
  );
};

export default SearchResults;
