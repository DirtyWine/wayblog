module.exports = {
    port: 3000,
    session: {
      secret: 'wayblog',
      key: 'wayblog',
      maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/wayblog'
  }