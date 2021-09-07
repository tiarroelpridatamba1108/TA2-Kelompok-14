<template>
  <div>
    <NavAdmin />
    <br />
    <div class="container p-5 mt-5">
      <div class="row g-0">
        <div class="col-md-4">
          <div class="card" style="width: 13rem">
            <img
              class="card-img-top"
              src="../assets/profile.jpg"
              alt="Card image cap"
            />
            <div class="card-body"></div>
          </div>
        </div>
        <template v-if="isLoggedIn">
          <div class="col-md-8">
            <div class="jumbotron">
              <button class="float-right btn-primary">
                <i class="fas fa-cog"></i> Edit Profile
              </button>
              <h5 class="font-weight-bold">Profile Pengguna</h5>
              <hr />
              <h6 class="mb-3">
                <strong>INFORMASI DIRI</strong>
              </h6>
              <p>Nama : {{ user.name }}</p>
              <p>Email : {{ user.email }}</p>
              <p>Jenis Kelamin : {{ user.gender }}</p>
              <p>Nomor Handphone : {{ user.phoneNumber }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import NavAdmin from "@/components/NavAdmin";
import { mapGetters } from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "ProfileAdmin",
  components: {
    NavAdmin,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    setUser(data) {
      this.user = data;
    },
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

    axios
      .get(`http://localhost:8000/api/user/admin/${data._id}`)
      .then((response) => this.setUser(response.data))
      .catch((error) => console.error(error));
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },
};
</script>
