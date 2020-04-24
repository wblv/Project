import api from "./api.js";

//使用async必须引入
const regeneratorRuntime = require("./regenerator-runtime/runtime-module");

Page({
  async test() {
    wx.showLoading({
      title: "加载中",
    });
    const res = await api.getData(app.globalData.openid, id);
    wx.hideLoading();
    if (res) {
      //do something
    }
  },
  //特殊code情况下
  async test2() {
    wx.showLoading({
      title: "加载中",
    });
    const res = await api.getData(app.globalData.openid, id);
    wx.hideLoading();
    if (res.rescode === "9001") {
      //do something
    } else if (res) {
      //do something
    }
  },
});
