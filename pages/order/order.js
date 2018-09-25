// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:"0",
    orderList:"",
    orderHead:[
      { title:"待接单",types:0 },
      { title: "已接单", types: 1 },
      { title: "维修中", types: 2 },
      { title: "已完成", types: 3 },
      { title: "已取消", types: 4 }
    ]
  },


  orderDel(e){
    console.log(e)
    wx.navigateTo({
      url: './deilter/deilter?id=' + e.currentTarget.dataset.id,
    })
  },

  getList(e){
    this.setData({
      types: e.currentTarget.dataset.index
    })
    this.getOrder(e.currentTarget.dataset.index);
  },

  getOrder(types){
    let that = this;
    wx.request({
      url: app.globalData.requestHttp + 'order/wx_read_order.php',
      header: app.globalData.requestHeader,
      method: "POST",
      data: {
        uid: app.globalData.openid,
        types: types
      },
      success(res) {
        that.setData({
          orderList: res.data.orderList
        })
      },
      fail() {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder(this.data.types);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrder(this.data.types);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      that.getOrder(that.data.types);
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})