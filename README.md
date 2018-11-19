# defer-until-online
This is a decorator that ensures that a function is deferred until the browser is [online](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine).
It works for asynchronous functions (returning promises).

In my tests I noticed that you get cases where the connection is unstable (on mobile for example) and this may improve the reliability of a web app.
```js
import deferUntilOnline from 'defer-until-online'

const deferUntil = deferUntilOnline({ timeout: 10000 })

const myfunc = deferUntil(() => {...})

const result = await myfunc(...)
```
**The library is ES5 but requires promise polyfill**
