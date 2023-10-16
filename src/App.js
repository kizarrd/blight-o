import ItemList, { loader as itemListLoader } from "./components/ItemList";
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
      { path: "/items", loader: itemListLoader, element: <ItemList /> },
      { path: "/brands", element: <BrandList /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
