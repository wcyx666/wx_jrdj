// pages/index/cleaning-project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeData:[
      { name: "电器", icon:"../../../image/index/icon_dianqi.png",types:1 },
      { name: "厨房电器", icon: "../../../image/index/icon_cufang.png", types: 2 },
      { name: "卫浴", icon: "../../../image/index/icon_weiyu.png", types: 3 },
      { name: "家具", icon: "../../../image/index/icon_jiaju1.png", types: 4 },
      { name: "灯具", icon: "../../../image/index/icon_dengju.png", types: 5 },
      { name: "门类", icon: "../../../image/index/icon_men.png", types: 6 },
    ],
    arctiveIndex:'-1',
    inputJug:false,
    typeName:"",// 维修名称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindIndex(e){
    console.log(e)
    this.setData({
      arctiveIndex: e.currentTarget.dataset.index,
      typeName: e.currentTarget.dataset.name,
    })
  },


  proType(){
    let that = this;
    wx.setStorage({
      key:"typeName",
      data: that.data.typeName,
      success:function(){
        wx.navigateBack({
          delta:1
        })
      }
    })
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