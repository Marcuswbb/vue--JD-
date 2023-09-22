import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.baseURL =
//   "https://www.fastmock.site/mock/f0e8ab5c5c19862e24bf5456d3cfca8f/api";
axios.defaults.baseURL = "http://127.0.0.1:3003/api";
// 设置跨域携带cookie
axios.defaults.withCredentials = true;

// 响应拦截
axios.interceptors.response.use((response) => {
  // 如果响应的状态码是200, 则直接返回响应的数据
  if (response.status === 200 && response.data.errno === 0) {
    // 将_id替换为id, 先将对象转换为字符串, 然后再转换为对象, 使用正则表达式替换
    let dataStr = JSON.stringify(response.data).replace(/"_id"/g, '"id"');
    // 将替换后的字符串转换为对象
    response.data = JSON.parse(dataStr);
    return response;
  }
  // 如果响应的错误码是10003, 说明没有登录, 跳转到登录页面
  if (response.status === 200 && response.data.errno === 10003) {
    // 清除登录状态
    // window.localStorage.removeItem("isLogin");
    // // 刷新页面
    // window.location.reload();
  }
});
//定义post请求
const post = (url, data = {}) => {
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
const get = (url, params = {}) => {
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
// 定义put请求
const put = (url, data = {}) => {
  // 返回一个promise对象
  return new Promise((resolve, reject) => {
    // 调用axios的put方法, 传入url和data
    axios.put(url, data).then(
      (response) => {
        // 成功时调用resolve
        resolve(response.data);
      },
      (error) => {
        // 失败时调用reject
        reject(error);
      }
    );
  });
};
export { post, get, put };
