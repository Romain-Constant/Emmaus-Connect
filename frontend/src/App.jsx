import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/mainLayout/MainLayout";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import NewPhone from "./pages/NewPhone";
import DbPhonePage from "./pages/DbPhonePage";
import FaqPage from "./pages/FaqPage";
import styles from "./App.module.css";
import ComparePhones from "./pages/ComparePhones";
import InfosPhonePage from "./pages/InfosPhonePage";

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
    path: "/utilisateur",
    element: <MainLayout />,
    children: [
      {
        path: "/utilisateur",
        element: <Home />,
      },
      {
        path: "/utilisateur/nouveautelephone",
        element: <NewPhone />,
      },
      {
        path: "/utilisateur/bddtelephones",
        element: <DbPhonePage />,
      },
      {
        path: "/utilisateur/bddtelephones/infos/:id",
        element: <InfosPhonePage />,
      },
      {
        path: "/utilisateur/bddtelephones/compare/:id1/:id2",
        element: <ComparePhones />,
      },
      {
        path: "/utilisateur/faq",
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
