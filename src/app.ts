import { runApp, IAppConfig } from 'ice';


const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  request: {

    interceptors: {
      request: {
        onConfig: (config) => {
          // 发送请求前：可以对 RequestConfig 做一些统一处理
          config.headers = { a: 1 };
          return config;
        },
        onError: (error) => {
          return Promise.reject(error);
        },
      },
      response: {
        onConfig: (response) => {
          console.log('response', response);
          // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
          /* if (!response.data.status !== 1) {
            alert('请求失败');
          } */
          return response;
        },
        onError: (error) => {
          // 请求出错：服务端返回错误状态码
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return Promise.reject(error.response.data);
        },
      },
    },
  },
};

runApp(appConfig);
