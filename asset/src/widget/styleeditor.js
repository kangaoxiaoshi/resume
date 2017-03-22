// import Vue from '../vendor/vue'
import template from './styleeditor.html'
import Prism from 'prismjs'

let options = {
  template: template,
  props: ['code'],
  computed: {
    highlightedCode() {
      return Prism.highlight(this.code, Prism.languages.css)
    },
    codeInStyleTag() {
      return `<style>${this.code}</style>`
    }
  },
  methods: { 
    goBottom() {
      this.$refs.container.scrollTop = 100000
    }   
  } 
}
export default options