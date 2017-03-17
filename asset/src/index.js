import PageView from './lib/pageView'
import template from './index.html'
const vueConfig = {
  template: template,
  methods() {

  },  
}
let view = new PageView({
  onCreate () {
    console.info('开始渲染页面...')
  },
  onShow() {
    this.registerView(vueConfig, {
      message: 'hhh'
    })
  }
});
