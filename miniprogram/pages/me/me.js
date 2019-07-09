const db = wx.cloud.database()
const test = db.collection('test')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  addone: function(){
    test.add({
      data:{
        description: "learn cloud database",
        due: Date("2018-09-01"),
        progress: 20,
        tags: [
          "cloud",
          "database"
        ],
        style: {
          color: 'white',
          size: 'large'
        },
        done: false
      },
      success: function(res){
        wx.showToast({
          icon: 'success',
          title: '上传成功',
        })
      }
    })
  },
  addone2: function () {
    test.add({
      data: {
        description: "write a novel",
        due: Date("2018-12-25"),
        progress: 50,
        tags: [
          "writing"
        ],
        style: {
          color: 'yellow',
          size: 'normal'
        },
        done: false
      }
    }).then(res => {
        wx.showToast({
          title: 'Pormise添加成功',
        })
    })
  },
  query: function(){
    test.doc('f1006ad85d24588c03f8074313101639').get({
      success: function(res){
        wx.showToast({
          title: res.data.done
        })
      }
    })
  },
  query2: function(){
    test.where({
        done:'Promise'
    })
    .get({
      success: function(res){
        console.log(res.data)
      }
    })
    
  },
  query3: function(){
    test.get({
      success: function(res){
        console.log(res.data)
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