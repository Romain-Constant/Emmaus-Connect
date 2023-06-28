import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/mainLayout/MainLayout";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import NewPhone from "./pages/NewPhone";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },
  {
    path: "/user",
    element: <MainLayout />,
    children: [
      {
        path: "/user",
        element: <Home />,
      },
      {
        path: "/user/nouveautelephone",
        element: <NewPhone />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
