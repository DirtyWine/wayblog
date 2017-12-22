


const fs = require('fs')
const path = require('path')

const express = require('express')
const router = express.Router()

const WayModel = require('../models/ways')
const checkLogin = require('../middlewares/check').checkLogin



// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  const author = req.query.author

  WayModel.getWays(author)
    .then(function (ways) {
      res.render('ways', {
        ways: ways
      })
    })
    .catch(next)
})

// GET /signup 注册页
router.get('/create', checkLogin, function (req, res, next) {
  res.render('admin-create')
})

// POST /signup 用户注册
router.post('/create', checkLogin, function (req, res, next) {
  
  const content = req.fields.content
  const author = req.session.user._id
  const avatar = req.files.avatar.path.split(path.sep).pop()

  // 校验参数
  try {
        if (!content.length) {
      throw new Error('请填写内容')
    }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    fs.unlink(req.files.avatar.path)
    req.flash('error', e.message)
    return res.redirect('/ways')
  }


  // 待写入数据库的用户信息
  let user = {
    author: author,
   content:content,
    avatar: avatar
  }
  // 用户信息写入数据库
  WayModel.create(user)
    .then(function (result) {
      // 此 user 是插入 mongodb 后的值，包含 _id
      user = result.ops[0]
      // 写入 flash
      req.flash('success', '注册成功')
      // 跳转到首页
      res.redirect('/ways')
    })
    .catch(function (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.avatar.path)
      // 用户名被占用则跳回注册页，而不是错误页
      next(e)
    })
})

module.exports = router