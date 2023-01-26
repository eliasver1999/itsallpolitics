import React from "react";
import "./App.css";

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

      <Route path="/category/*">
        <Route path=":category" element={<Politics />}>
          <Route index element={<Politics />} />
        </Route>
      </Route>
      <Route path="/category/ΔΙΕΘΝΗ/article/*">
        <Route path=":id" element={<SingleArticle />}>
          <Route index element={<SingleArticle />} />
          <Route path=":groupId" element={<SingleArticle />} />
        </Route>
      </Route>
      <Route path="/category/ΚΟΙΝΩΝΙΑ/article/*">
        <Route path=":id" element={<SingleArticle />}>
          <Route index element={<SingleArticle />} />
          <Route path=":groupId" element={<SingleArticle />} />
        </Route>
      </Route>
      <Route path="/category/ΠΟΛΙΤΙΚΗ/article/*">
        <Route path=":id" element={<SingleArticle />}>
          <Route index element={<SingleArticle />} />
          <Route path=":groupId" element={<SingleArticle />} />
        </Route>
      </Route>
      <Route path="/category/ΟΙΚΟΝΟΜΙΑ/article/*">
        <Route path=":id" element={<SingleArticle />}>
          <Route index element={<SingleArticle />} />
          <Route path=":groupId" element={<SingleArticle />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
