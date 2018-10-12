// pages/index/appointment/appointment.js


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateList:"",
    timeIndex:0,
    timestamp:"" // 当前时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.requestHttp + 'time/wx_make_time.php',
      header: app.globalData.requestHeader,
      method: "POST",
      success(res) {
        setTimeout(function () {
          wx.hideLoading();
          that.setData({
            dateList: res.data,
          })
        }, 2000)  
      },
      fail() {

      }
    })
  },

  getTime(e){
    this.setData({
      timeIndex: e.currentTarget.dataset.index
    })
  },

  // 获取预约时间
  chooseTime(e) {
    let date = e.currentTarget.dataset.date;
    let time = e.currentTarget.dataset.time;
    let stamps = {
      date: date,
      time: time
    }
    let stamp = date + " " + time;
    let timestamp = new Date(stamp).getTime();
    console.log(timestamp)
    if (timestamp > this.data.timestamp) {
      wx.setStorage({
        key: "timestamp",
        data: stamps,
        success: function () {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },

  // 获取当前时间
  getTiem() {
    let timestamp = new Date().getTime();
    this.setData({
      timestamp: timestamp
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTiem();
    wx.showLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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