import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  BrowserRouter as Router,
} from "react-router-dom";
import { useContext } from "react";
import MainLayout from "./components/mainLayout/MainLayout";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import NewPhone from "./pages/NewPhone";
import DbPhonePage from "./pages/DbPhonePage";
import FaqPage from "./pages/FaqPage";
import styles from "./App.module.css";
import { AuthContext } from "./AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  import ComparePhones from "./pages/ComparePhones";
  import InfosPhonePage from "./pages/InfosPhonePage";

  const secureRouter = createBrowserRouter([
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
          path: "/utilisateur/home",
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

  return (
    <div className={styles.appContainer}>
      {currentUser ? (
        <RouterProvider router={secureRouter} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/connexion" element={<Connexion />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
