const marked = require('marked')
const Way = require('../lib/mongo').Way



// 将 Way 的 content 从 markdown 转换成 html
Way.plugin('contentToHtml', {
    afterFind: function (ways) {
      return ways.map(function (way) {
        way.content = marked(way.content)
        return way
      })
    },
    afterFindOne: function (way) {
      if (way) {
        way.content = marked(way.content)
      }
      return way
    }
  })

module.exports = {
  // 创建一篇文章
  create: function create (way) {
    return Way.create(way).exec()
  },

  // 按创建时间升序获取所有用户文章或者某个特定用户的所有文章
  getWays: function getWays (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    return Way
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: 1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  }
 
}