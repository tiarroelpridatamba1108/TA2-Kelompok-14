<template>
  <div class="register">
    <Navbar />
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <div class="card mt-3 shadow p-3 mb-3 bg-body rounded">
          <div class="card-header">
            <div align="center">
              <img src="../assets/hero.png" height="80px" />
              <h5>
                <b>Apotek Glen</b>
              </h5>
            </div>
          </div>
          <div class="card-body">
            <div
              class="alert alert-danger"
              v-for="(error, index) in errors"
              :key="index"
            >
              {{ error[0] }}
            </div>
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder
                  required
                />
              </div>
              <div class="form-group">
                <label>Nama</label>
                <input
                  v-model="name"
                  type="textarea"
                  class="form-control"
                  placeholder
                  required
                />
              </div>
              <div class="form-group">
                <label>Nomor Handphone</label>
                <input
                  v-model="phoneNumber"
                  type="number"
                  class="form-control"
                  minlength="10"
                  maxlength="12"
                  placeholder
                  required
                />
              </div>

              <div class="form-group">
                <label for="gender">Jenis Kelamin</label>
                <select
                  id="gender"
                  class="form-control"
                  name
                  v-model="gender"
                  required
                >
                  <option value="U">-</option>
                  <option value="F">Perempuan</option>
                  <option value="M">Laki-laki</option>
                </select>
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder
                  required
                />
              </div>
              <div class="row" align="center">
                <button type="submit" class="col-md-12 btn btn-success">
                  Register
                </button>
              </div>
            </form>

            <div class="mt-3" align="center">
              sudah memiliki akun? -
              <router-link to="/login">Login Sekarang</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "Register",
  components: { Navbar },
  data() {
    return {
      email: "",
      name: "",
      phoneNumber: "",
      gender: "",
      password: "",
      errors: null,
    };
  },
  methods: {
    register: function () {
      let data = {
        email: this.email,
        name: this.name,
        gender: this.gender,
        phoneNumber: this.phoneNumber,
        password: this.password,
      };
      this.$store
        .dispatch("register", data)
        .then((response) => {
          console.log(response.data);
          this.$router.push({
            name: "Login",
          });
        })
        .catch((error) => {
          this.errors = error;
          console.error(error);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
<style>
.card-body {
  padding-right: 40px;
  padding-left: 40px;
}
button {
  font-size: 16px;
  width: 34rem;
}
</style>
