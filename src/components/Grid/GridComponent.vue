<template>
  <div>
    <GridWrapper>
      <div v-for="(data, index) in dummy" v-bind:key="index">
        {{ data.content }}
      </div>
    </GridWrapper>
  </div>
</template>

<script>
import { GridWrapper } from "./style";

export default {
  name: "GridComponent",

  data() {
    return {
      dummy: [
        { content: "1" },
        { content: "2" },
        { content: "3" },
        { content: "4" },
        { content: "5" },
        { content: "6" },
        { content: "7" },
        { content: "8" },
      ],
    };
  },
  components: {
    GridWrapper,
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
