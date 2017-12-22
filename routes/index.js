module.exports = function (app) {
    app.get('/', function (req, res) {
      res.redirect('/posts')
    })
    app.use('/signup', require('./signup'))
    app.use('/signin', require('./signin'))
    app.use('/signout', require('./signout'))
    app.use('/posts', require('./posts'))
    app.use('/comments', require('./comments'))
    app.use('/ways', require('./ways'))
    app.use('/admin', require('./adminSignin'))

    app.get('/notice', function (req, res) {
      res.render('notice')
    })
    // 404 page
    app.use(function (req, res) {
      if (!res.headersSent) {
        res.status(404).render('404')
      }
    })
  }