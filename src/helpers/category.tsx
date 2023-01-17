import { instance } from "../axios/axiosInstance";
import { store } from "../redux/store";
import { ApiKind } from "../types/api";
import { CategoryActionKind, categoryType } from "../types/category";
export const getCategories = function () {
  const state = store.getState();
  return new Promise<string>((resolve, reject) => {
    instance({
      url: ApiKind.GETCATEGORIES,
      method: "GET",
    })
      .then((res) => {
        store.dispatch({
          type: CategoryActionKind.GETALLCATEGORIES,
          payload: res.data,
        });
        resolve(res.data.message);
      })
      .catch((error: string) => {
        reject(error);
      });
  });
};
