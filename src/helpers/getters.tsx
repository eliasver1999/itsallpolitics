import { instance } from "../axios/axiosInstance";

import { store } from "../redux/store";
import { ApiKind } from "../types/api";
import { BlogActionKind, blogType } from "../types/blog";

interface IFormInput {
  title: string;
  image: File;
  body: string;
}
export const getBlogs = function () {
  const state = store.getState();
  return new Promise<string>((resolve, reject) => {
    instance({
      url: ApiKind.GETBLOGS,
      method: "GET",
    })
      .then((res) => {
        res.data?.sort(function (a: blogType, b: blogType) {
          const bDate: any = new Date(b.created_at);
          const aDate: any = new Date(a.created_at);

          return bDate - aDate;
        });
        store.dispatch({ type: BlogActionKind.GETALL, payload: res.data });
        resolve(res.data.message);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// Bump an article's view counter (fire-and-forget). Resolves to the new
// count, or null if the request fails — never rejects, so callers stay simple.
export const incrementView = function (id: number) {
  return new Promise<number | null>((resolve) => {
    instance({ url: `blog/${id}/view`, method: "POST" })
      .then((res) => resolve(res.data?.views ?? null))
      .catch(() => resolve(null));
  });
};

export const getBlogs2 = function () {
  const state = store.getState();
  instance({
    url: ApiKind.GETBLOGS,
    method: "GET",
  })
    .then((res) => {
      res.data?.sort(function (a: blogType, b: blogType) {
        const bDate: any = new Date(b.created_at);
        const aDate: any = new Date(a.created_at);

        return bDate - aDate;
      });
      return res.data;
    })
    .catch(() => {});
};
