import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./Search.module.css";
import { useSelector } from "react-redux";

const Search = ({ scrolledDown = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const loading = useSelector((state) => state.loading.state);
  const searchHandler = (e) => {
    e.preventDefault();
    if (loading) {
      setKeyword((prev) => "");
      alert(
        "아직 이전 검색 결과의 데이터를 불러오는 중입니다. 잠시 후 다시 시도해 주세요"
      );
      return;
    }
    const trimmedKeyword = keyword.trim();
    console.log(trimmedKeyword);
    if (trimmedKeyword === "") {
      alert("검색어를 입력해 주세요.");
      return;
    }
    setSearchParams({ search: trimmedKeyword, page: 1 });
  };

  return (
    <form onSubmit={searchHandler} className={scrolledDown && classes.flat}>
      <input
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
      />
      <button className={classes.searchButton} type="submit">
        <SearchIcon fontSize="medium" />
      </button>
    </form>
  );
};

export default Search;
