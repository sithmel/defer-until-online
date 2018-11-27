
function deferUntilOnline (opts) {
  opts = opts || {}
  var timeout = opts.timeout
  return function (func) {
    return function () {
      var context = this
      var args = Array.prototype.slice.call(arguments, 0)
      var isOnLine = typeof navigator.onLine === 'undefined' ? true : navigator.onLine
      if (isOnLine) {
        return func.apply(context, args)
      }

      var task = new Promise(function (resolve, reject) {
        function updateOnlineStatus () {
          window.removeEventListener('online', updateOnlineStatus)
          func.apply(context, args)
            .then(resolve)
            .catch(reject)
        }
        window.addEventListener('online', updateOnlineStatus)
      })

      if (typeof timeout === 'undefined') {
        return task
      }

      var to = new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('Defer until Online: Timeout')), timeout)
      })

      return Promise.race([task, to])
    }
  }
}

module.exports = deferUntilOnline
