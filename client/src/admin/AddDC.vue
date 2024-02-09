<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <h1>Add Candidat</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addDC">
        <div class="register">
          <label for="lbnom">Nom</label>
          <input type="text" v-model="model.dc.familyname" placeholder="Enter Family Name" id="lbnom" required
            class="form-control" />
          <label for="lbprenom">Prénom</label>
          <input type="text" v-model="model.dc.firstname" placeholder="Enter First Name" id="lbprenom" required
            class="form-control" />
          <label for="lbemail">Email</label>
          <input type="email" v-model="model.dc.email" placeholder="Enter Email" id="lbemail" class="form-control"
            required />
          <button type="submit" class="js-new">Add Candidat</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urldc from "../_helpers/urllist.js";
import $ from "jquery";
export default {
  name: "AddDC",
  data() {
    return {
      error: "",
      model: {
        dc: {
          familyname: "",
          firstname: "",
          email: "",
        }
      }

    };
  },
  mounted() {
    $(document).keypress(function (e) {
      if (e.which === 13) {
        // enter has been pressed, execute a click on .js-new:
        $(".js-new").first().click();
      }
    });
  },
  methods: {
    async addDC() {
      try {
        const url = urldc.getAddDcUrl();
        let result = await axios.post(url, {
          familyname: this.model.dc.familyname,
          firstname: this.model.dc.firstname,
          email: this.model.dc.email,
        });
        console.log(result);
        if (result.status == 201) {
          this.$router.push({ name: 'user' })
        }
      }
      catch (err) {
        this.error = err.errors
      }
    },
  },
};
</script>