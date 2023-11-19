import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import BrandListPage from "./pages/BrandListPage";
import ItemListPage from "./pages/ItemListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Navigate to="/items?page=1" /> },
      { path: "/items", element: <ItemListPage /> },
      { path: "/brands", element: <BrandListPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
