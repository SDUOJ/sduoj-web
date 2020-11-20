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
/* eslint-disable import/first */
window.hljs = hljs;
require('highlightjs-line-numbers.js');
import 'highlight.js/styles/github.css';

Vue.directive('highlight', el =>  {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  })
})

Vue.directive('highlight-linenumber', el =>  {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
    hljs.highlightBlock(block);
    hljs.lineNumbersBlock(block);
  })
})
