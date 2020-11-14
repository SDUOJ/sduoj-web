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
        return parseInt(this.$route.query.pageSize) || 15;
      },
      set: function(pageSize) {
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
