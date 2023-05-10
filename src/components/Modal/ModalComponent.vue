<template>
  <v-app>
    <v-dialog transition="dialog-bottom-transition" max-width="900">
      <template v-slot:activator="{ on, attrs }">
        <button id="modalButton" color="primary" v-bind="attrs" v-on="on">{{ buttonName }}</button>
      </template>
      <template v-slot:default="dialog">
        <slot>
          <v-btn text @click="dialog.value = false" />
        </slot>
      </template>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  name: "ModalComponent",
  props: {
    buttonName: String,
  },
};
</script>

<style>
#modalButton {
  width: 70px;
  height: 40px;
  padding: 5px;
  background-color: tomato;
  color: whitesmoke;
  border-radius: 20px;
  font-weight: 800;
  font-size: 15px;
}
</style>
<!-- 사용법  -->
<!-- <modal-component buttonName="버튼이름">modal test</modal-component> -->
