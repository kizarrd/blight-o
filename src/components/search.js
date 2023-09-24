import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { searchActions } from "../store/search-slice";
import { useState } from "react";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const searchHandler = (e) => {
    e.preventDefault();
    console.log(keyword);
    dispatch(searchActions.search({ keyword }));
  };

  return (
    <form onSubmit={searchHandler}>
      <input
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
      />
      <button type="submit">
        <SearchIcon fontSize="small" />
      </button>
    </form>
  );
};

export default Search;
