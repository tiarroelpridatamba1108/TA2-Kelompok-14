<template>
  <div class="detail_produkAdmin">
    <NavAdmin />
    <div class="mx-5">
      <div class="container-fluid">
        <!--Breadcrumb-->
        <div class="row mt-4">
          <div class="col">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/admin/dashboardproduk" class="text-dark"
                    >Dashboard</router-link
                  >
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/admin/daftarproduk" class="text-dark"
                    >Daftar Obat</router-link
                  >
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Detail Obat
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div class="row g-0" align="center">
          <div class="col-md-6 mt-2">
            <img
              :src="product.imageUrl"
              class="img-fluid shadow"
              width="300px"
            />
          </div>

          <div class="col-md-4">
            <div class="card border-0 rounded shadow">
              <div class="card-body">
                <table class="table table-borderless mt-3">
                  <tbody>
                    <tr>
                      <td class="font-weight-bold">Nama Obat</td>
                      <td>:</td>
                      <td>{{ product.name }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Harga Obat</td>
                      <td>:</td>
                      <td>{{ product.price }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Deskripsi</td>
                      <td>:</td>
                      <td>{{ product.description }}</td>
                      <!-- <td class="card-body">
                      <div v-html="product.content"></div>
                    </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavAdmin from "@/components/NavAdmin";
import axios from "axios";

export default {
  name: "DetailAdminProduk",
  components: {
    NavAdmin,
  },
  data() {
    return {
      product: {}, // menampilkan 1 data
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8000/api/product/id/${this.$route.params._id}`)
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.error(error));
  },
};
</script>