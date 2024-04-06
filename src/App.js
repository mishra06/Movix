
import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movies from "./pages/Movies";
import  NewTv  from "./pages/NewTv";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";


const routes = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/movies",
    Component: Movies,
  },
  {
    path: "/tv-Show",
    Component: NewTv,
  },
  {
    path: "/search/:movie",
    Component: Search,
  },
  {
    path: "/movie/:id",
    Component: MovieDetails,
  },
]);

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
