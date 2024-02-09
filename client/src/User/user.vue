<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div class="d-flex gap-2 py-3">
      <button type="button" class="btn btn-outline-primary" @click="openAddDC()">
        Nouveau candidat
      </button>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <table id="usertable" class="table table-striped" style="width:100%">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Tags</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(acRow, index) in this.AcRows" :key="index">
            <td class="text-start">{{ acRow.familyname }}</td>
            <td class="text-start">{{ acRow.firstname }}</td>
            <td class="text-start">{{ acRow.email }}</td>
            <td class="text-start">{{ acRow.status_name }}</td>
            <td class="text-start">{{ acRow.tags }}</td>
            <td>
              <a class="btn btn-success mx-2" :href="'/#/editDC/' + acRow.id">
                Edit
              </a>
              <button type="button" class="btn btn-danger mx-2" @click="deleteDC(acRow.id)">
                Delete
              </button>
              <a class="btn btn-outline-success btn-sm" :href="'/#/formCandidatSaisie/' + acRow.id" target="_blank">
                Voir le dossier
              </a>
              <img type="button" class="btn btn-outline-warning btn-sm" src="../assets/copyimage.png"
                @click="CopyUrl(acRow.id)" />
              <a class="btn btn-outline-primary btn-sm mx-2" :href="'/#/dcDownload/' + acRow.id" target="_blank">
                Download
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
    </div>
  </div>
</template>  
<script>
import Admin_Layout from "../admin/admin_Layout.vue";
import axios from "axios";
import urldc from "../_helpers/urllist.js";
import $ from "jquery";
export default {
  name: "user",
  components: { Admin_Layout },
  data() {
    return {
      AcRows: [],
      error: "",
    };
  },
  mounted() {
    try {
      this.getDCs();
      console.log("data: " + this.AcRows);

    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getDCs() {
      const url = urldc.getDcsUrl();
      axios.get(url).then((res) => {
        console.log(res.data);
        this.AcRows = res.data;
        $(document).ready(function () {
          $('#usertable').DataTable();
        });
      });
    },
    openAddDC() {
      this.$router.push({ name: "AddDC" });
    },
    deleteDC(dcId) {
      alert("DC: " + dcId);
      if (confirm("Are you sure, you want to delete this dc. DC Id: " + dcId)) {
        const url = urldc.getDelDcUrl(dcId);
        alert("url: " + url);
        axios
          .delete(url)
          .then((res) => {
            console.log(res.data);
            this.getDCs();
          })
          .catch(function (err) {
            if (err.response) {
              this.error = err.response.data.errors;
            }
          });
      }
    },
    goToDC(dcId) {
      alert("DC: " + dcId);
      let self = this;
      self.$router.push(`/formCandidatSaisie/${dcId}`);
    },
    CopyUrl(id) {
      const siteurl = process.env.NODE_ENV == 'production' ? process.env.VUE_APP_SITEURLPROD : process.env.VUE_APP_SITEURLDEV;     
      console.log("siteurl: "+ siteurl + process.env.NODE_ENV)
      var content = siteurl + "/#/formCandidatSaisie/" + id;
      navigator.clipboard.writeText(content);
    },
  },
};
</script>  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a.btn-sm {
  margin-right: 5px;
}

img {
  border: 1px solid #ddd;
  border-radius: 1px;
  padding: 2px;
  width: 15px;
}
</style>
  