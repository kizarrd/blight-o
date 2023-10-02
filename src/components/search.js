import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { searchActions } from "../store/search-slice";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    console.log(keyword);
    setSearchParams({ search: keyword });
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
