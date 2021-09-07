<template>
  <div class="col-md-2 bg-dark p-4">
    <div class="nav flex-column">
      <template v-if="isLoggedIn">
        <li class="nav-item">
          <router-link class="nav-link active text-white" to="/">
            <i class="fas fa-home mx-2"></i> Home
          </router-link>
          <hr />
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/produks">
            <i class="fas fa-pills mx-2"></i> Produk
          </router-link>
          <hr />
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/pesanan">
            <i class="fas fa-shopping-cart mx-2"></i> Pesanan
          </router-link>
          <hr />
        </li>
      </template>
      <template v-else>
        <li class="nav-item">
          <router-link class="nav-link active text-white" to="/">
            <i class="fas fa-home mx-2"></i> Home
          </router-link>
          <hr />
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/produks">
            <i class="fas fa-pills mx-2"></i> Produk
          </router-link>
          <hr />
        </li>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      user: "user",
    }),
  },
};
</script>

<style>
.nav-link:hover {
  background-color: grey;
}
</style>
