import { useSelector } from "react-redux";
import ItemList from "./components/ItemList";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

function App() {
  const itemListDataByPagination = useSelector(
    (state) => state.pagination.itemsOnCurrentPage
  );
  const itemListDataBySearch = useSelector(
    (state) => state.search.searchResult
  );


  // routing으로 search page와 all items(전체) 페이지 구분 필요함
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blight-O</h1>
        <Search />
      </header>
      <main>
        <h1>search result</h1>
        <ItemList itemListData={itemListDataBySearch} />
        <h1>all items</h1>
        <ItemList itemListData={itemListDataByPagination} />
        <Pagination />
      </main>
    </div>
  );
}

export default App;
