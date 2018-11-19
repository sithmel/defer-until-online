
function deferUntilOnline (opts) {
  opts = opts || {}
  var timeout = opts.timeout || Infinity
  return function (func) {
    return function () {
      var context = this
      var args = Array.prototype.slice.call(arguments, 0)
      var isOnLine = typeof navigator.onLine === 'undefined' ? true : navigator.onLine
      if (isOnLine) {
        return func.apply(context, args)
      }

      var to = new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('Timeout')), timeout)
      })

      var task = new Promise(function (resolve, reject) {
        function updateOnlineStatus () {
          clearTimeout(to)
          window.removeEventListener('online', updateOnlineStatus)
          func.apply(context, args)
            .then(resolve)
            .catch(reject)
        }
        window.addEventListener('online', updateOnlineStatus)
      })
      return Promise.race([task, to])
    }
  }
}

module.exports = deferUntilOnline
