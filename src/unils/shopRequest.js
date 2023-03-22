//店铺详情页接口
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL =
  "https://www.fastmock.site/mock/101548a181428ff6748af0f59353e373/api";
//定义post请求
const postShop = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
// 定义get请求
const getShop = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export { postShop, getShop };
