<template>
  <div>
    <Navbar />
    <div class="login-box center-align">
      <div class="card-panel red darken-2" v-if="error != null">
        <span class="white-text">{{ error.message }}</span>
      </div>
      <h4>Reset Password</h4>
      <hr />
      <form>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Password Baru</label>
          <input
            v-model="newpass"
            type="password"
            class="form-control"
            required
          />
        </div>
        <br />
        <div align="center">
          <button class="btn btn-success btn-large" type="submit">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "Confirm",
  components: {
    Navbar,
  },
  data() {
    return {
      email: '',
      newpass: '',
      error: [],
    }
  }
  // methods: {
  //     confirm () {
  //         /*eslint: no-unused-vars: "off"*/
  //         this.$cognitoAuth.confirmRegistration(this.username, this.confirmcode, (err, result) => {
  //             if (err) {
  //                 this.error = err
  //             } else {
  //                 this.$router.push('/profile')
  //             }
  //         });
  //     }
  // }
};
</script>
<style scoped>
h4 {
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 20px;
}
p {
  text-align: center;
  font-size: 14px;
  padding-bottom: 10px;
}
.login-box {
  width: 400px;
  height: auto;
  background-color: white;
  margin-top: 70px;
  border-radius: 5px;
  padding: 60px;
  margin: auto;
  margin-top: 70px;
  border: 1px solid #e4e6e7;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
}
button i {
  font-size: 14px;
}
</style>
