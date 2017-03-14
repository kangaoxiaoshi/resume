let webpack = require('webpack')

let complier = webpack({

})

// complier.run((err, stats) => {
// })
let watcher = complier.watch({
  aggregateTimeout: 1000,

}, (err, stats) => {
  if (err) throw err
  if (stats.hasErrors) {
    // 如果有错
  }
})