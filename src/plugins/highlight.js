import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-gist.css';

// 定义一个全局指令
Vue.directive('highlight', el =>  {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(blocks => {
    hljs.highlightBlock(blocks);
  })
})
