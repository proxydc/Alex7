<script>
import { ref } from "vue";
export default {
  props: {
    certifications: [],
    maxILength: {
      type: Number,
      required: true,
    },
  },
  methods: {
    addRow() {
      var newNode = document.getElementById("ghost_cert").cloneNode(true);
      newNode.id = "";
      newNode.style = "";
      newNode.classList = "cert dc-tmp";
      document.getElementById("certs").appendChild(newNode);
      certAddedCounter.value++;
    },
  },
};
const certAddedCounter = ref(0);
</script>

<template>
  <div>
    <h5>Diplômes / Certifications</h5>
    <div id="certs">
      <div class="cert" v-for="(cert, index) in certifications" :key="cert">
        <div class="row">
          <div class="col col-3">
            <input class="form-control dc-vlist" type="number" min="1970" max="2030" placeholder="Année" 
              :value="cert.year" :key="index" id="" />
          </div>
          <div class="col col-9">
            <input class="form-control dc-vlist" type="text" placeholder="Libellé" :value="cert.title" :key="index" :maxlength="maxILength" />
          </div>
        </div>
      </div>
      <div class="cert" id="ghost_cert" style="display: none; /* Template for new certification */">
        <div class="row">
          <div class="col col-3">
            <input class="form-control dc-vlist" type="number" min="1970" max="2030" placeholder="Année" id="" name="" />
          </div>
          <div class="col col-9">
            <input class="form-control dc-vlist" type="text" placeholder="Libellé" id="" name="" :maxlength="maxILength" />
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-outline-info btn-sm" @click="addRow">
      Ajouter un diplôme / une certification
    </button>
  </div>
</template>
