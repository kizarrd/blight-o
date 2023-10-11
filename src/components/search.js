import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.css";

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    console.log(trimmedKeyword);
    if (trimmedKeyword === "") {
      alert("검색어를 입력해 주세요.");
      return;
    }
    setSearchParams({ search: trimmedKeyword, page: 1 });
  };

  return (
    <form onSubmit={searchHandler}>
      <input
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
      />
      <button className={styles.searchButton} type="submit">
        <SearchIcon fontSize="medium" />
      </button>
    </form>
  );
};

export default Search;
