<template>
  <div>
    <table class="table table-bordered table-success">
      <thead class="text-center">
        <tr>
          <th>Nomor</th>
          <th>Nama Pengguna</th>
          <th>Email</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <!--merender data array dari props users dan membuat loop-->
        <tr v-for="(user, index) in users" :key="user._id">
          <th class="text-right">{{ index + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <div align="center">
              <div class="btn btn-danger">
                <b-icon-trash @click="deleteUser(user._id)"> </b-icon-trash>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UserTable",
  //cara kita meneruskan data dari komponen induk(CreateProduk) ke komponen anak(ProdukTable)
  props: {
    users: Array,
  },
  //   data() {
  //     return {
  //       userId: null,
  //     };
  //   },

  methods: {
    deleteUser(_id) {
      this.$emit("delete-user", _id);
    },
  },
};
</script>
