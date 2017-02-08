var app = getApp()
Page({
  data: {
    text: "",
    categoryArray: [],
    ticketShow: [],
    catagorys: [],
    userInfo: {}
  },
  onLoad: function (opt) {
    console.log("首页数据")
    var that = this
    //调用应用实例的方法获取全局数据

    that.requestData()
  },
  requestData: function () {
    console.log("请求数据")
    var that = this;
    var tempData = [{}, {}, {}, {}, {
      name: "全部",
      title: "恋爱犀牛、仙剑",
      image: "",
      id: "0"
    }]
    app.func.requestGet('show/category/', {}, function (cres) {
      for (var j = 0; j < cres.length; j++) {
        console.log(cres[j])
        if (cres[j].name == "话剧歌剧") {
          tempData[0] = cres[j]
        }
        if (cres[j].name == "演唱会") {
          tempData[1] = cres[j]
        }
        if (cres[j].name == "音乐会") {
          tempData[2] = cres[j]
        }
        if (cres[j].name == "体育赛事") {
          tempData[3] = cres[j]
        }
      }

      that.setData({
        categoryArray: tempData
      })
      console.log("fsdf")
    });

    if (that.data.categoryArray.lenght < 1) {
      console.log("that.data.categoryArray")
      that.requestData()
    }
    app.func.requestGet('show/hot/', {}, function (res) {
      for (var i = 0; i < res.length; i++) {
        var dic_count = res[i].min_discount * 10
        res[i].min_discount = dic_count.toFixed(1)
      }
      that.setData({
        ticketShow: res
      })
    });
    if (that.data.categoryArray.length == 0) {
      console.log("0")
    }else{
      console.log("1")
    }

    wx.stopPullDownRefresh()
  },
  showTap: function (event) {
    var data = event.currentTarget.dataset.show
    data.cover = ""
    data.session.v
    data.category.icon = ""
    if (event.currentTarget.dataset.show.session_count > 1) {
      var show = JSON.stringify(data)
      console.log(show)
      wx.navigateTo({
        url: '../scene/ticket_scen?show=' + show
      })
    } else {
      data.session.venue_map = ""
      var show = JSON.stringify(data)
      console.log(show)
      wx.navigateTo({
        url: '../ticket_desc/ticket_desc?show=' + show
      })
    }
  },

  categoryTap: function (event) {
    var data = event.currentTarget.dataset.category
    data.icon = ""
    wx.navigateTo({
      url: '../category/category?categoty=' + JSON.stringify(data)
    })
  },
  onPullDownRefresh: function () {
    var that = this
    that.requestData()
  },
})