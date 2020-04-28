let ip = `https://api..com`;
const ips = ["https://test.api.com", "https://api.com"];
/**
 *
 * @param {string} method 请求方法
 * @param {Boolean} showError 是否在小程序页面显示错误提示
 * @param {Boolean} noAuth 是否携带权限认证
 */

function handleRequest(method, { path, data = {}, showError = true, noAuth }) {
  const app = getApp();
  const openid = app.globalData.openid;
  let url = "";
  if (wx.getStorageSync("nowenv") !== "pro") {
    ip = ips[0];
  } else {
    ip = ips[1];
  }
  url = ip + path;
  if (!noAuth) {
    if (path.includes("?")) {
      url += `&openid=${openid}`;
    } else {
      url += `?openid=${openid}`;
    }
  }
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync("nowenv") !== "pro") {
      ip = "https://test.api.com";
    } else {
      ip = `https://api.com`;
    }
    wx.request({
      url: ip + url,
      data,
      method,
      header: {},
      success: function (res) {
        if (res.data.code === "200") {
          //兼容后端没有返回值的接口
          if (res.data.data === null) {
            res.data.data = true;
          }
          resolve(res.data.data);
        } else if (res.data.code === "9001") {
          //兼容特殊code的情况，将外层code放在内层，方便引用
          res.data.data.rescode = "9001";
          resolve(res.data.data);
        } else {
          //请求失败，显示原因
          if (showError) {
            wx.showToast({
              title: res.data.desc,
              icon: "none",
              duration: 1000,
            });
          } else {
            console.log("error code：" + res.data.code);
            console.log("error desc：" + res.data.desc);
          }
          resolve(false);
        }
      },
      fail: function () {
        wx.showToast({
          title: "未知错误，请检查网络后重试",
          icon: "none",
          duration: 1000,
        });
        reject("请检查网络");
      },
      complete: function () {
        // complete
      },
    });
  });
}
function get(params) {
  return handleRequest("GET", params);
}
function post(params) {
  return handleRequest("POST", params);
}
function del(params) {
  return handleRequest("DElETE", params);
}

export default {
  ips,
  get,
  post,
  del,
};
