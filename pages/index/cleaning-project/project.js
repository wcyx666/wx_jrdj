// pages/index/cleaning-project/project.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeData:[
      { name: "冷柜", icon:"../../../image/type/icon_lg.png",types:1 },
      { name: "冰箱", icon: "../../../image/type/icon_bx.png", types: 2 },
      { name: "彩电", icon: "../../../image/type/icon_ds.png", types: 3 },
      { name: "空调", icon: "../../../image/type/icon_kt.png", types: 4 },
      { name: "波轮洗衣机", icon: "../../../image/type/icon_xyj_2.png", types: 5 },
      { name: "滚筒洗衣机", icon: "../../../image/type/icon_xyj_1.png", types: 6 },
      { name: "抽烟机", icon: "../../../image/type/icon_yyj.png", types: 7 },
      { name: "燃气灶具", icon: "../../../image/type/icon_yqz.png", types: 8 },
      { name: "消毒柜", icon: "../../../image/type/icon_xdg.png", types: 9 },
      { name: "电热水器", icon: "../../../image/type/icon_rsq.png", types: 10 },
      { name: "净水器", icon: "../../../image/type/icon_jsq.png", types: 11 },
      { name: "饮水机", icon: "../../../image/type/icon_ysj.png", types: 12 },
      { name: "生活类小电器", icon: "../../../image/type/icon_qt.png", types: 13 },
    ],
    arctiveIndex:'-1',
    arctiveCor:"-1",
    inputJug:false,
    typeName:"",// 维修名称
    problemArr:"", // 故障
    problemTitle: "", // 故障名称
    types:"", // 维修物品类型
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindIndex(e){
    let that = this;
    wx.request({
      url: app.globalData.requestHttp + 'task/wx_task_type.php',
      header: app.globalData.requestHeader,
      method: "POST",
      data: {
        option: e.currentTarget.dataset.name.types,
      },
      success(res) {
        console.log(res);
        let problem = res.data.datas.repair_problem;
        let arr = problem.split('，');
        that.setData({
          problemArr: arr,
        })
      },
      fail() {

      }
    })
    that.setData({
      arctiveIndex: e.currentTarget.dataset.index,
      typeName: e.currentTarget.dataset.name,
      types: e.currentTarget.dataset.name.types,
    })
  },

  problem(e){
    this.setData({
      arctiveCor: e.currentTarget.dataset.index,
      problemTitle: e.currentTarget.dataset.title,
    })
  },


  proType(){
    let that = this;
    if (that.data.problemTitle == ''){
      wx.showToast({
        title: "维修故障为空",
        icon: 'none',
      })
    }else {
     
      let obj = {
        name: that.data.typeName,
        title: that.data.problemTitle,
      }
      wx.setStorage({
        key: "typeName",
        data: obj,
        success: function () {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
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