/* eslint-env node, mocha */
var assert = require('chai').assert
var deferUntilOnline = require('..')

describe('deferUntilOnline', () => {
  beforeEach(() => {
    global.navigator = {}
    global.window = { removeEventListener: () => {}, addEventListener: () => {} }
  })
  afterEach(() => {
    delete global.navigator
    delete global.window
  })

  it('should run', () => {
    global.navigator.onLine = true
    const deferUntil = deferUntilOnline({ timeout: 10 })
    const f = deferUntil((a, b) => Promise.resolve(a + b))
    return f(3, 4)
      .then((res) => {
        assert.equal(res, 7)
      })
  })

  it('should timeout', () => {
    global.navigator.onLine = false
    const deferUntil = deferUntilOnline({ timeout: 10 })
    const f = deferUntil((a, b) => Promise.resolve(a + b))
    return f(3, 4)
      .catch((err) => {
        assert.equal(err.message, 'Timeout')
      })
  })
})
