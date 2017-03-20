import Vue from '../vendor/vue'
import util from './util'
import {Promise} from './es6'

function pageView (options) {
  Object.assign(this, options)
  this._initialize()
}


Object.assign(pageView.prototype, {
  options: {},
  onCreate: util.noop,
  ajax: util.noop,
  onShow: util.noop,
  _initialize () {
    this.onCreate() 
    this._cssInsert()   
    this._requestPage()
  },
  _requestPage () {
    // let ajaxs = this.ajax()
    // if (!Array.isArray(ajax)) {
    //   ajaxs = [ajaxs]
    // }
    
    // Promise.all()
    this.onShow()
  },
  registerView (vueConfig = {}, data) {
    if (true) {
      Object.assign(vueConfig, {
        created() {
          //console.log(`模板渲染数据:\n${JSON.stringify(data)}`)
          console.time(`${this._uid}创建时间`)
        },
        mounted() {
          console.timeEnd(`${this._uid}创建时间`)
        },
        beforeUpdate() {
          //console.time(`${this._uid}更新时间`)
        },
        updated() {
          //console.log(`模板更新数据:\n${JSON.stringify(data)}`)
          //console.timeEnd(`${this._uid} 更新时间`)          
        }
      })
    }
    // let el = document.createElement('div')
    // document.querySelector('#main').appendChild(el)
    let options = Object.assign({
      el: '#main',
      data: data
    }, vueConfig)
    this.vue = new Vue(options)
       
    this.vue.pageView = this
  },
  _cssInsert() {
    const pageCss = this.options.css
    if (pageCss) {
      let style = document.createElement('style')
      style.innerHTML = pageCss
      document.querySelector('head').appendChild(style)
    }
  }  
})
//
//module.exports = {pageView: pageView}
export default pageView