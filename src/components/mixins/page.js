/*
 * Copyright 2020-2020 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

export default {
  data: function() {
    return {
      pageSizeOpts: [15, 30, 50, 100],
      total: 0
    }
  },
  methods: {
    onPageChange: function (pageNow) {
      this.pageNow = pageNow;
    },
    onPageSizeChange: function (pageSize) {
      this.pageSize = pageSize;
    },
    onSort: function({ key, order }) {
      if (order === 'normal') {
        this.sortBy = '';
        this.ascending = false;
      }  else {
        this.sortBy = key;
        this.ascending = (order === 'asc');
      }
    }
  },
  computed: {
    pageNow: {
      get: function() {
        return parseInt(this.$route.query.pageNow) || 1;
      },
      set: function(pageNow) {
        this.$router.push({ query: { ...this.$route.query, pageNow } });
      }
    },
    pageSize: {
      get: function() {
        return Math.min(parseInt(this.$route.query.pageSize) || 15, this.pageSizeOpts[this.pageSizeOpts.length - 1]);
      },
      set: function(pageSize) {
        pageSize = Math.min(pageSize, this.pageSizeOpts[this.pageSizeOpts.length - 1]);
        this.$router.push({ query: { ...this.$route.query, pageSize } });
      }
    },
    sortBy: {
      get: function() {
        return this.$route.query.sortBy || '';
      },
      set: function(sortBy) {
        this.$router.push({ query: { ...this.$route.query, sortBy } });
      }
    },
    ascending: {
      get: function() {
        return this.$route.query.ascending || '';
      },
      set: function(ascending) {
        this.$router.push({ query: { ...this.$route.query, ascending } });
      }
    }
  }
}
