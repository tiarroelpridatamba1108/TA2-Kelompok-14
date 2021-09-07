<template>
  <div class="login">
    <Navbar />
    <div class="row justify-content-md-center">
      <div class="login-box">
        <div align="center">
          <img src="../assets/hero.png" height="80px" />
          <h5>Apotek Glen</h5>
        </div>
        <hr />
        <!--<div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
          {{ error[0] }}
        </div>-->
        <form @submit.prevent="userLogin">
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
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder
              required
            />
          </div>
          <div align="center">
            <button class="btn btn-success btn-large" type="submit">
              Login
            </button>
          </div>
        </form>
        <p>
          tidak memiliki akun? -
          <router-link to="/register">Daftar Akun Sekarang</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    userLogin() {
      let email = this.email;
      let password = this.password;

      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>
<style scoped>
h5 {
  text-align: center;
  margin: 0;
  padding: 0;
  font-weight: 800;
  font-size: 18px;
}
p {
  text-align: center;
  font-size: 14px;
}
.login-box {
  width: 400px;
  height: auto;
  background-color: white;
  border-radius: 5px;
  padding: 40px;
  margin-top: 30px;
  border: 1px solid #e4e6e7;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
}
button {
  font-size: 16px;
  margin-bottom: 20px;
  width: 20rem;
}
</style>
