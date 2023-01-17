import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Politics from "./Pages/Politics";
import SingleArticle from "./Pages/SingleArticle";
import { getCategories } from "./helpers/category";
import { getBlogs } from "./helpers/getters";

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
      <Route path="/category/politics" element={<Politics />} />
      <Route path="/category/politics/article/*">
        <Route path=":id" element={<SingleArticle />}>
          <Route index element={<SingleArticle />} />
          <Route path=":groupId" element={<SingleArticle />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
