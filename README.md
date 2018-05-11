# typeobjectpool
this is package for managing object created. 
# how to use
npm install typeobjectpool 

```js
var Objectpool = require('../build/index.js').ObjectPool
var pool = new Objectpool(Object)
var object1 = pool.allocObject()
var object2 = pool.allocObject()
var object3 = pool.allocObject()
var object4 = pool.allocObject()
pool.releaseObject(object4)
pool.releaseObject(object3)
var object5 = pool.allocObject()
var count = pool.unReleaseCount()
console.log(count)
```