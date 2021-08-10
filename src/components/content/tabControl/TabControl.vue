<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="item in titles" :key="item">
      <span
        @click="btnclick(item)"
        :class="clickitem == item ? 'isActive' : 'notActive'"
        >{{ item }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      clickitem: '流行',
    };
  },
  methods: {
    btnclick(item) {
      this.clickitem = item;
      this.$emit('tabclick',item)
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.isActive {
  color: var(--color-high-text);
  border-bottom: red solid 4px;
}
span {
  text-align: center;
  padding: 10px;
}
</style>