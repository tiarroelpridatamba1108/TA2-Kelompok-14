<template>
  <div>
    <Navbar />
    <div class="container p-4 mt-3">
      <div class="row g-0">
        <div class="col-md-12">
          <div v-if="errors.length">
            <div
              v-for="error in errors"
              :key="error.index"
              class="alert alert-danger mt-1"
              role="alert"
            >
              {{ error }}
            </div>
          </div>

          <div class="jumbotron">
            <h5 class="font-weight-bold">Profile Pengguna</h5>
            <hr />
            <form @submit.prevent="postUpdate">
              <div class="form-group">
                <label>Nama</label>
                <input type="text" class="form-control" v-model="user.name" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" v-model="user.email" />
              </div>
              <div class="form-group">
                <label>Nomor Handphone</label>
                <input
                  type="number"
                  class="form-control"
                  min="0"
                  v-model="user.phoneNumber"
                />
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-md btn-success mr-3">
                  SIMPAN
                </button>
                <button type="reset" class="btn btn-md btn-danger">
                  RESET
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import axios from "axios";
import jwt from "jsonwebtoken";
export default {
  name: "editprofileUser",
  components: {
    Navbar,
  },
  data() {
    return {
      user: {},
      errors: [],
    };
  },
  created() {
    let data;
    jwt.verify(
      axios.defaults.headers.common["Authorization"].split(" ")[1],
      "ta_kel14",
      (err, decode) => {
        data = decode;
      }
    );
    axios
      .get(`http://localhost:8000/api/user/admin/${data._id}`)
      .then((response) => {
        this.user = response.data;
      });
  },
  methods: {
    postUpdate(e) {
      if (this.user.name && this.user.email && this.user.phoneNumber) {
        const post = {
          userId: this.user._id,
          name: this.user.name,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
        };
        axios
          .put("http://localhost:8000/api/user/", post)
          .then(() => {
            this.$router.push({
              name: "Profile",
            });
          })
          .catch((error) => {
            console.error(error.response.data.data);
          });
      }
      this.errors = [];
      if (!this.user.name) {
        this.errors.push("Masukkan Nama");
      }
      if (!this.user.email) {
        this.errors.push("Masukkan Email");
      }
      if (!this.user.phoneNumber) {
        this.errors.push("Masukkan Nomor Handphone");
      }
      e.preventDefault();
    },
  },
};
</script>