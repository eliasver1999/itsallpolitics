import { instance } from "../axios/axiosInstance";
import { ApiKind } from "../types/api";

export const sendContact = function (data: any) {
  return new Promise<string>((resolve, reject) => {
    instance({
      url: ApiKind.SENDEMAIL,
      data: data,
      method: "POST",
    })
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((error: string) => {
        reject(error);
      });
  });
};
