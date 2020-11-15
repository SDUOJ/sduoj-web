/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

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
