<template>
  <div class="daftarpengguna">
    <NavAdmin />
    <div class="row no-gutters">
      <NavAdmin2 />
      <div class="col-md-10 p-5">
        <h3 class="mt-5 text-success">Daftar Pengguna</h3>
        <hr />

        <UserTable :users="users" @delete-user="deleteuser" />
      </div>
    </div>
  </div>
</template>
<script>
import NavAdmin from "@/components/NavAdmin";
import NavAdmin2 from "@/components/NavAdmin2";
import UserTable from "@/components/UserTable";
import axios from "axios";

export default {
  name: "DaftarPengguna",
  components: {
    NavAdmin,
    NavAdmin2,
    UserTable,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    setUsers(data) {
      this.users = data;
    },
    deleteuser(_id) {
      axios
        .delete(`http://localhost:8000/api/user/admin/${_id}`)
        .then(() => {
          this.users = this.users.filter((user) => user._id !== _id);
        })
        .catch((error) => console.error(error));
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8000/api/user/admin/customer`)
      .then((response) => {
        this.setUsers(response.data);
      })
      .catch((error) => console.error(error));
  },
};
</script>

<style scoped>
#createproduk {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #ffffff;
  margin-top: 60px;
}
</style>
