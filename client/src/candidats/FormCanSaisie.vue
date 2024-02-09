<template>
  <div>
    <div v-for="(dc, index) in this.form" :key="index">
      <div class="container">
        <p class="h2 dc-page-title">Dossier de compétences</p>
      </div>
      <div v-if="errormsg" class="alert alert-danger alert-dismissible fade show">
        <strong>Error!</strong> <br />{{ errormsg }}
      </div>
      <div class="container p-3 my-5 bg-light border border-primary dc-form">
        <form action="" @submit.prevent="onSubmit">
          <dcIdentity :familyname="dc.familyname" :firstname="dc.firstname" :email="dc.email" />
          <div class="row dc-section">
            <div class="col">
              <AbilityFonc title="Compétences fonctionnelles" uid="fonct" :maxILength="maxInputLength"
                :functionalAbilities="dc.document.functionalAbilities" />
            </div>
            <div class="col">
              <AbilityTech title="Compétences techniques" uid="techn" :maxILength="maxInputLength"
                :functionalAbilities="dc.document.technicalAbilities" />
            </div>
          </div>
          <div class="row dc-section">
            <div class="col">
              <Certification :certifications="dc.document.certifications" :maxILength="maxInputLength" />
            </div>
            <div class="col">
              <Language :languages="dc.document.languages" :maxILength="maxInputLength" />
            </div>
          </div>

          <ExperiencePro :experiences="dc.document.experiences" :xpAddedCounter=0 :maxILength="maxInputLength" />
          <ExperiencePerso :projects="dc.document.projects" :xpAddedCounter=0 :maxILength="maxInputLength" />

          <div class="container dc-section">
            <div class="row align-items-center dc-syn-item">
              <div class="col col-2">
                <label class="col-form-label" for="syn_env">Environnement</label>
              </div>
              <div class="col col-8">
                <input @keydown.enter="focusnext" :maxlength="maxInputLength" class="form-control" id="syn_env"
                  v-model="dc.document.skills.environments" />
              </div>
            </div>
            <div class="row align-items-center dc-syn-item">
              <div class="col-2">
                <label class="col-form-label" for="syn_lang">Languages</label>
              </div>
              <div class="col-8">
                <input @keydown.enter="focusnext" class="form-control" id="syn_lang"
                  v-model="dc.document.skills.languages" />
              </div>
            </div>
            <div class="row align-items-center dc-syn-item">
              <div class="col-2">
                <label class="col-form-label" for="syn_bdd">SGBD</label>
              </div>
              <div class="col-8">
                <input @keydown.enter="focusnext" class="form-control" id="syn_bdd"
                  v-model="dc.document.skills.databases" />
              </div>
            </div>
            <div class="row align-items-center dc-syn-item">
              <div class="col-2">
                <label class="col-form-label" for="syn_out">Outils</label>
              </div>
              <div class="col-8">
                <input @keydown.enter="focusnext" class="form-control" id="syn_out" v-model="dc.document.skills.tools" />
              </div>
            </div>
            <div class="row align-items-center dc-syn-item">
              <div class="col-2">
                <label class="col-form-label" for="syn_sys">Systèmes</label>
              </div>
              <div class="col-8">
                <input @keydown.enter="focusnext" class="form-control" id="syn_sys"
                  v-model="dc.document.skills.systems" />
              </div>
            </div>
          </div>

          <div class="row dc-section">
            <div class="col">
              <h5>En bref</h5>
              <textarea class="form-control dc-ta-bref" placeholder="..." v-model="dc.document.bref"></textarea>
            </div>
          </div>

          <div class="row dc-section">
            <div class="col text-center">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary" @click="save(dc)">
                  Enregistrer
                </button>
                <button type="button" class="btn btn-warning" @click="saveAndClose(dc)">
                  Marquer comme finalisé
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import dcIdentity from "./ChildComponents/DcIdentity.vue";
import AbilityFonc from "./ChildComponents/DcAbilityFonc.vue";
import AbilityTech from "./ChildComponents/DcAbilityTech.vue";
import Certification from "./ChildComponents/DcCertification.vue";
import Language from "./ChildComponents/DcLanguage.vue";
import ExperiencePro from "./ChildComponents/DcExperiencePro.vue";
import ExperiencePerso from "./ChildComponents/DcExperiencePerso.vue";
import urldc from "../_helpers/urllist.js";
import axios from "axios";
import FormData from "./FormData";


export default {
  components: {
    dcIdentity,
    AbilityFonc,
    AbilityTech,
    Certification,
    Language,
    ExperiencePro,
    ExperiencePerso,
  },
  name: "formCandidatSaisie",
  data() {
    return {
      documentId: "",
      form: [],
      document: {},
      xpAddedCounter: 0,
      errormsg: "",
      maxInputLength: 60,
    };
  },
  setup() {
    const form = ref({
      familyname: "",
      firstname: "",
      email: "",
      functionalAbilities: [],
      title: "",
      uid: "",
    });
  },
  computed: {
    getDocument() {
      console.log("document: " + this.form);
      this.document = JSON.stringify(this.form?.document);
    },
  },
  /* mounted() {
    try {
      console.log("Iam here");
      this.getDC(this.$route.params.id);
      console.log("data: " + this.form);
    } catch (err) {
      this.errormsg = err.message;
    }
  },*/
  created() {
    try {
      this.documentId = this.$route.params.id;
      console.log("Iam here");
      this.getDC(this.$route.params.id);
      console.log("data: " + this.form);
    } catch (err) {
      this.errormsg = err.message;
    }
  },
  methods: {
    /*focusnext(e) {
      const inputs = array.from(e.target.form.queryselectorall('input[type="text"]'));
      const index = inputs.indexof(e.target);

      if (index < inputs.length) {
        inputs[index + 1].focus();
      }
    },*/
    getDC(id) {
      try {
        const url = urldc.getDcUrl(id);
        axios.get(url).then((res) => {
          console.log(res.data);
          if (res.status == 200) { this.form = res.data; }
          if (res.status == 201) {
            this.$router.push({ name: 'NotFound' })
          }
        });
      } catch (err) {
        this.errormsg = err;
      }
    },
    save(dc) {
      try {
        alert("idwork: " + this.documentId)
        const status = 2;
        FormData.save(this.$route.params.id, dc.document, document, status);
        location.reload();
      } catch (err) {
        this.errormsg = err;
      }
    },
    saveAndClose(dc) {
      try {
        alert("idwork: " + this.documentId)
        const status = 3;
        FormData.save(this.$route.params.id, dc.document, document, status);
        this.$router.push({ name: "PageEnd" })
      } catch (err) {
        this.errormsg = err;
      }
    },
  },
};
</script>
<style>
#logo {
  margin: 5px 60px 5px 10px;
  max-height: 48px;
}

.dc-page-title {
  padding-top: 17px;
  margin-bottom: 3rem;
}

.dc-vlist {
  margin: 0.5rem 0rem;
}

.dc-section {
  margin-bottom: 3rem;
}

form h5 {
  font-variant: small-caps;
  font-weight: bold;
  color: #008cba;
}

.dc-ta-bref {
  height: 6rem;
}

.dc-syn-item {
  margin-bottom: 1rem;
}

.dc-syn-item label {
  font-weight: bold;
  color: #008cba;
}
</style>
