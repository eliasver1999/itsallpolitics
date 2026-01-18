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
        // Validate that response is an array
        if (Array.isArray(res.data)) {
          store.dispatch({
            type: CategoryActionKind.GETALLCATEGORIES,
            payload: res.data,
          });
          resolve("Categories loaded successfully");
        } else {
          console.error("Invalid category data format:", res.data);
          store.dispatch({
            type: CategoryActionKind.GETALLCATEGORIES,
            payload: [],
          });
          reject("Invalid data format received from API");
        }
      })
      .catch((error: any) => {
        console.error("Failed to fetch categories:", error);
        store.dispatch({
          type: CategoryActionKind.GETALLCATEGORIES,
          payload: [],
        });
        reject(error);
      });
  });
};
