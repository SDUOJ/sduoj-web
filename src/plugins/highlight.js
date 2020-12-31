/*
 * Copyright 2020-2021 the original author or authors.
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

// highlight 会改变原有的DOM结构，导致数据更新时vue不会刷新
// 我们需要手动检测数据更新，然后重新渲染
Vue.directive('highlight', {
  deep: true,
  bind: (el, binding) => {
    // on first bind, highlight all targets
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      if (typeof binding.value === 'string') {
        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  },
  componentUpdated: (el, binding) => {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      if (typeof binding.value === 'string') {
        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  }
});

Vue.directive('highlight-linenumber', {
  deep: true,
  bind: (el, binding) => {
    // on first bind, highlight all targets
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      if (typeof binding.value === 'string') {
        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
      hljs.lineNumbersBlock(target);
    });
  },
  componentUpdated: (el, binding) => {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      if (typeof binding.value === 'string') {
        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
      hljs.lineNumbersBlock(target);
    });
  }
});
