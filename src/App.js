import ItemList from "./components/ItemList";
import Pagination from "./components/Pagination";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blight-O</h1>
        
      </header>
      <main>
        <ItemList />
        <Pagination />
      </main>
    </div>
  );
}

export default App;
