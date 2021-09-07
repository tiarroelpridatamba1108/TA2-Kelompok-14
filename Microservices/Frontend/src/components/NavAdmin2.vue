<template>
  <div class="col-md-2 bg-dark mt-5 pr-4 pl-4 pt-5 pb-5">
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link active text-white" to="/admin/dashboardproduk">Dashboard</router-link>
        <hr />
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin/createproduk">Create Produk</router-link>
        <hr />
      </li>

      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin/daftarproduk">Daftar Produk</router-link>
        <hr />
      </li>

      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin/daftarPengguna">Daftar Pengguna</router-link>
        <hr />
      </li>

      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin/transaksi">Transaksi</router-link>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavAdmin2",
};
</script>

<style></style>
