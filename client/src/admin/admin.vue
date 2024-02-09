<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div class="d-flex gap-2 py-3">
      <button type="button" class="btn btn-outline-primary" @click="openAddAccount()">
        Nouveau account
      </button>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table id="admintable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Login</th>
                <th scope="col">Display Name</th>
                <th scope="col">Role Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.id }}</th>
                <td class="text-start">{{ acRow.login_name }}</td>
                <td class="text-start">{{ acRow.display_name }}</td>
                <td class="text-start">{{ acRow.role_name }}</td>
                <td class="text-start"><!--:href="'/editAccount/' + acRow.id"-->
                  <button class="btn btn-success mx-2" @click="editAccount(acRow.id)">
                    Edit
                  </button>
                  <button type="button" class="btn btn-danger mx-2" @click="deleteAccount(acRow.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import Admin_Layout from "../admin/admin_Layout.vue";
import urlacc from "../_helpers/urllist.js";
import $ from "jquery";
export default {
  name: "admin",
  components: { Admin_Layout },
  data() {
    return {
      AcRows: [],
      error: "",
    };
  },
  mounted() {
    try {

      this.getLogins();
      console.log("data: " + this.AcRows);
    }
    catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getLogins() {
      const url = urlacc.getLoginUrl();
      axios.get(url).then(res => {
        console.log(res.data);
        this.AcRows = res.data;
        $(document).ready(function () {
          $('#admintable').DataTable();
        });
      });
    },
    openAddAccount() {
      this.$router.push({ name: "AddAccount" });
    },
    deleteAccount(accountId) {
      if (confirm('Are you sure, you want to delete this account. Account Id: ' + accountId)) {
        const url = urlacc.getEditDelAccUrl(accountId);
        axios.delete(url).then(res => {
          console.log(res.data);
          this.getLogins();
        }).catch(function (err) {
          if (err.response) {
            this.error = err.response.data.errors;
          }
        });
      }
    },
    editAccount(accountId) {
      this.$router.push({ path: "/editAccount/" + accountId });
    },
  },
};
</script>
  