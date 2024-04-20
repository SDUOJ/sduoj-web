/*
 * Copyright 2020-2022 the original author or authors.
 *
 * Licensed under the Affero General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/agpl-3.0.en.html
 */

export default {
  data: function() {
    return {
      excelData: [],
      excelColumns: []
    }
  },
  methods: {
    beforeUpload: function(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$Message.warn('Please do not upload files larger than 1MB.');
      return false;
    },
    handleSuccess: function({ results, header }) {
      this.excelData = results.slice(1);
      this.excelColumns = header.map(o => {
        return {
          title: o,
          key: o
        }
      });
    },
    clearExcel: function() {
      this.excelData = [];
      this.excelColumns = [];
    }
  }
}
