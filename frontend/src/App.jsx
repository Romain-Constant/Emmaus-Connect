import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/mainLayout/MainLayout";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import NewPhone from "./pages/NewPhone";
import DbPhonePage from "./pages/DbPhonePage";
import FaqPage from "./pages/FaqPage";
import styles from "./App.module.css";

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
      {
        path: "/user/bddtelephones",
        element: <DbPhonePage />,
      },
      {
        path: "/user/bddtelephones/infos/:imei",
        element: <DbPhonePage />,
      },
      {
        path: "/user/faq",
        element: <FaqPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className={styles.appContainer}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
