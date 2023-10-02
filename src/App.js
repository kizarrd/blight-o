import ItemList from "./components/ItemList";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import BrandList from "./components/BrandList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Navigate to="/items" /> },
      { path: "/items", element: <ItemList /> },
      { path: "/brands", element: <BrandList /> },
    ],
  },
]);

function App() {
  // routing으로 search page와 all items(전체) 페이지 구분 필요함
  return <RouterProvider router={router} />;

  // <div className="App">
  //   <main>
  //     <h1>search result</h1>
  //     <ItemList itemListData={itemListDataBySearch} />
  //     <h1>all items</h1>
  //     <ItemList itemListData={itemListDataByPagination} />
  //     <Pagination />
  //   </main>
  // </div>
}

export default App;
