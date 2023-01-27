import React from "react";
import "./App.css";

import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Politics from "./Pages/Politics";
import SingleArticle from "./Pages/SingleArticle";
import { getCategories } from "./helpers/category";
import { getBlogs } from "./helpers/getters";
import NoMatch from "./Pages/NoMatch";

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
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/category/*">
        <Route path=":category" element={<Politics />}>
          <Route index element={<Politics />} />
        </Route>
      </Route>
      <Route
        path="/category/:categoryId/article/:id"
        element={<SingleArticle />}
      />

      <Route path="/category/:id/article/:id?*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
