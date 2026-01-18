import React from "react";
import "./App.css";

import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Politics from "./Pages/Politics";
import SingleArticle from "./Pages/SingleArticle";
import Unsubscribe from "./Pages/Unsubscribe";
import AuthorPage from "./Pages/AuthorPage";
import { getCategories } from "./helpers/category";
import { getBlogs } from "./helpers/getters";
import NoMatch from "./Pages/NoMatch";
import ReactGA from "react-ga";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import PrivacyPolicy from "./components/PrivacyPolicy";
const TRACKING_ID = "G-0VHZX96P2T"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
function App() {
  React.useEffect(() => {
    getBlogs()
      .then()
      .catch((error) => {
        console.log(error);
      });
    getCategories()
      .then()
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/newsletter/unsubscribe/:token" element={<Unsubscribe />} />
        <Route path="/author/:authorName" element={<AuthorPage />} />

        <Route path="/category/*">
          <Route path=":category" element={<Politics />}>
            <Route index element={<Politics />} />
          </Route>
        </Route>
        <Route
          path="/category/:categoryId/article/:id"
          element={<SingleArticle />}
        />
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;
