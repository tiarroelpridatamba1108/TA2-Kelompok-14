<template>
  <div class="produk">
    <Navbar />
    <div class="row no-gutters">
      <Sidebar />
      <div class="col-md-10 p-5">
        <h3 class="mb-4 text-success">Daftar Obat</h3>
        <div class="input-group mb-4">
          <input
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Cari Obat Anda"
            aria-label="Cari"
            aria-describedby="basic-addon1"
            @keyup="searchProduk"
          />
          <button class="button btn-success">
            <span class="icon" id="basic-addon1">
              <i class="fas fa-search"></i>
            </span>
          </button>
        </div>

        <div class="row">
          <div
            class="col-md-6 p-2 mb-2"
            v-for="product in products"
            :key="product._id"
          >
            <CardProduk :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CardProduk from "@/components/CardProduk";
import axios from "axios";

export default {
  name: "Produk",
  components: {
    Navbar,
    Sidebar,
    CardProduk,
  },
  data() {
    return {
      products: [], //menampilkan seluruh produk
      search: "",
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
    searchProduk() {
      axios
        .get("http://localhost:8000/api/product/?name=" + this.search)
        .then((response) => this.setProducts(response.data))
        .catch((error) => console.error(error));
    },
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/product/")
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.error(error));
  },
};
</script>
