<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-success">
    <div class="container-fluid">
      <router-link class="navbar-brand text-white" to="/">
        <strong>APOTEK GLEN</strong>
      </router-link>
      <ul class="navbar-nav">
        <template v-if="isLoggedIn">
          <b-navbar-nav class="mr-auto">
            <div class="row g-0">
              <div class="col-md-6">
                <li class="nav-item">
                  <b-dropdown :text="userName" variant="Secondary" class="w-50">
                    <li class="user-footer">
                      <div>
                        <a href="/profile" class="btn btn-default btn-flat">
                          <i class="fas fa-user text-success"></i> Profile
                        </a>
                        <a class="btn btn-default btn-flat" @click="logout">
                          <i class="fas fa-sign-out-alt text-success"></i>
                          Keluar
                        </a>
                      </div>
                    </li>
                  </b-dropdown>
                </li>
              </div>

              <div class="col-md-6">
                <li class="nav-item">
                  <router-link class="nav-link text-white" to="/keranjang">
                    <i
                      class="fas fa-shopping-bag text-white"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="keranjang"
                    ></i>
                    |
                    <span class="badge badge-secondary">
                      {{
                        updateKeranjang
                          ? updateKeranjang.length
                          : jumlah_pesanans.length
                      }}
                    </span>
                  </router-link>
                </li>
              </div>
            </div>
          </b-navbar-nav>
        </template>

        <template v-else>
          <div class="row g-0">
            <div class="col-md-6">
              <li class="nav-item">
                <router-link
                  class="btn btn-outline-primary text-white"
                  to="/login"
                  >Login</router-link
                >
              </li>
            </div>

            <div class="col-md-6">
              <li class="nav-item">
                <router-link
                  class="btn btn-outline-primary text-white"
                  to="/register"
                  >Register</router-link
                >
              </li>
            </div>
          </div>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "Navbar",
  data() {
    return {
      jumlah_pesanans: [],
      userName: "User",
    };
  },
  props: ["updateKeranjang"], //data yang dioper dari satu komponen ke komponen lain
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },
  methods: {
    setJumlah(data) {
      this.jumlah_pesanans = data;
    },
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({
          name: "Login",
        });
      });
    },
    mounted() {
      let data;
      jwt.verify(
        axios.defaults.headers.common["Authorization"].split(" ")[1],
        "ta_kel14",
        (err, decode) => {
          data = decode;
        }
      );
      const userId = data._id;
      this.pesan.quantity = this.pesan.jumlah_pemesanan;
      axios
        .post("http://localhost:8083/cart/", userId)
        .then((response) => this.setJumlah(response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>
