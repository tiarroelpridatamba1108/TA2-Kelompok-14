<template>
  <div>
    <NavAdmin />
    <div class="row no-gutters">
      <NavAdmin2 />
      <div class="col-md-10 p-5">
        <h3 class="mt-5 text-success">Daftar Jenis Obat</h3>
        <hr />
        <p>
          <b-button v-b-toggle.collapse-2 class="m-1 bg-primary">
            <i class="fas fa-plus"></i>
            Tambah Jenis Obat
          </b-button>
        </p>

        <ProdukTable
          v-bind:products="products"
          @edit-product="editproduct"
          @delete-product="deleteproduct"
        />

        <b-collapse id="collapse-2">
          <b-card>
            <h2>Masukkan Data Obat</h2>
            <hr />

            <!-- <product-form @add-product="addproduct"/> -->
            <ProdukForm @add-product="addproduct" />
          </b-card>
        </b-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import NavAdmin from "@/components/NavAdmin";
import NavAdmin2 from "@/components/NavAdmin2";
import ProdukTable from "@/components/ProdukTable";
import ProdukForm from "@/components/ProdukForm";
import axios from "axios";

export default {
  name: "create-table",
  components: {
    NavAdmin,
    NavAdmin2,
    ProdukTable,
    ProdukForm,
  },
  data() {
    return {
      products: ["product"],
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
    addproduct(product) {
      axios
        .post(`http://localhost:8000/api/product/admin/`, product)
        .then((response) => {
          this.products = [...this.products, response.data];
        })
        .catch((error) => console.error(error));
    },
    editproduct(data) {
      axios
        .put(`http://localhost:8000/api/product/admin/`, data)
        .then(() => {
          this.products = this.products.map((product) =>
            product.productId === data._id ? data : product
          );
        })
        .catch((error) => console.error(error));
    },
    deleteproduct(_id) {
      axios
        .delete(`http://localhost:8000/api/product/admin/${_id}`)
        .then(() => {
          this.products = this.products.filter(
            (product) => product._id !== _id
          );
        })
        .catch((error) => console.error(error));
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8000/api/product/`)
      .then((response) => this.setProducts(response.data))
      .catch((error) => console.error(error));
  },
};
</script>
