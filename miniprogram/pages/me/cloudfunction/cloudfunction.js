const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:''
  },
  add: function(){
    var _this =this
    wx.cloud.callFunction({
      name:'add',
      data:{
        a:50,
        b:20
      },
      success:res => {
        console.log('res')
        console.log(res)
        _this.setData({
          info:res.result
        })
      }
      
    })
  },
  querydb: function(){
    var _this = this
    wx.cloud.callFunction({
      name: 'query',
      data: {},
      success: res => {
        console.log('res')
        console.log(res)
        
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid){
     console.log('test',app.globalData.openid)
    }else{
      setTimeout(function(){
        console.log('test', app.globalData.openid)
      },500)
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