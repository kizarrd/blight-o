import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import BrandList from "./components/BrandList";
import ItemListPage from "./components/ItemListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { path: "/", element: <Navigate to="/items" /> },
      { path: "/items", element: <ItemListPage /> },
      { path: "/brands", element: <BrandList /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
