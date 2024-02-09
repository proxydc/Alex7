<template>
  <div>
    <h5>{{ title }}</h5>
    <div id="techn">
      <input
        v-for="(ability, index) in functionalAbilities" :maxlength="maxILength"
        :value="ability"
        :key="index"
        class="form-control dc-vlist"
        type="text"
      />
    </div>

    <button
      type="button"
      class="btn btn-outline-info btn-sm"
      @click="addRow(maxILength)"
    >
      Ajouter une compétence
    </button>
  </div>
</template>

<script>
export default {
 /* data() {
    return {
      uid: "",
      titile: "",
      functionalAbilities: [],
      error: "",
    };
  },*/
  props: {
    title: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    functionalAbilities: [],
    maxILength: {
      type: Number,
      required: true,
    },
  },
  methods: {
    addRow(len) {
      var container = document.getElementById("techn");
      var newInput = document.createElement("input");
      newInput.classList = "form-control dc-vlist dc-tmp";
      newInput.maxLength = len; 
      container.appendChild(newInput);
    },
  },
};
</script>

<style scoped>
</style>
