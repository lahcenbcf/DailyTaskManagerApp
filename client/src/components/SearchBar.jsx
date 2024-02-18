import {  useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch} from "react-redux";
import { searchTask } from "../actions/task";
import { useDebounce } from "../customHooks/useDebounce";

function SearchBar() {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const dispatch = useDispatch();
  useDebounce(keyword,searchTask,dispatch)

  return (
    <div className="flex bg-inherit justify-center items-center rounded-md border-2 border-primary">
      <input
        type="search"
        value={keyword}
        onChange={handleChange}
        placeholder="search"
        className="py-3 px-5 bg-inherit outline-none"
      />
      <IoIosSearch size={20} className="h-full mx-2" />
    </div>
  );
}

export default SearchBar;
