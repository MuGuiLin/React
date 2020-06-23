const md5 = require('../utils/md5.js')

module.exports = (data = {}) => {

  let jsonrpc = "2.0",
      timetamp = (new Date()).valueOf(),
      nonce = Math.random().toString(36).substr(2),
      key = "OwMMI8YXkgU36ODGC6j2jsbz6mtY90Fh",
      openid = wx.getStorageSync('get-info').openid || '',
      unionid = wx.getStorageSync('get-info').unionid || '',
      sign = md5.hexMD5(`jsonrpc=${jsonrpc}&nonce=${nonce}&openid=${openid}&timetamp=${timetamp}&unionid=${unionid}${key}`);

  return Object.assign({jsonrpc, timetamp, nonce, sign, openid, unionid}, data)
};