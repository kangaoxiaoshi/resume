import Vue form 'vue'
import util from './util'

function pageView (options) {
  this.options = options
  this._initialize()
}

_initialize() {

}
_requestPage: function () {

}

Object.assign(pageView.prototype, {
  onCreate: util.noop
})

module.exprots = pageView