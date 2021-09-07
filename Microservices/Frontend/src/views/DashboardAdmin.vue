<template>
  <div class="dashboard">
    <NavAdmin />
    <div class="row no-gutters">
      <NavAdmin2 />
      <div class="col-md-10 p-5">
        <h3 class="mt-5 text-success">
          <i class="fas fa-laptop-medical"></i> APOTEK GLEN SIAP UNTUK MELAYANI
          KEBUTUHAN ANDA
        </h3>
        <hr />
        <div>
          <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            fade
            indicators
            img-width="1024"
            img-height="200"
          >
            <b-carousel-slide
              caption=""
              img-src="https://www.unicef.org/indonesia/media/3211/file"
              img-height="50px"
            ></b-carousel-slide>
            <b-carousel-slide
              caption=""
              img-src="https://iain-surakarta.ac.id/wp-content/uploads/2020/03/2889_yuk_cegah_virus_corona_2.jpg"
            ></b-carousel-slide>
            <b-carousel-slide
              caption=""
              img-src="https://www.who.int/images/default-source/searo---images/countries/indonesia/covid19/be-active-5-female--bi.tmb-1920v.png?sfvrsn=31b80500_1"
            ></b-carousel-slide>
          </b-carousel>
        </div>

        <br />
        <p>
          Tetap jaga kesehatan untuk meningkatkan Imun supaya memutus mata
          rantai covid 19
        </p>
        <h3 class="mt-5 text-success">Obat Tersedia</h3>
        <hr />
        <div class="row p-2">
          <router-link
            to="/admin/daftarproduk"
            class="btn btn-success float-right"
          >
            <b-icon-eye></b-icon-eye>Lihat Semua Obat
          </router-link>
        </div>

        <div class="row">
          <div
            class="col-md-6 p-2 mb-2"
            v-for="product in products"
            :key="product.id"
          >
            <ProdukAdmin :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavAdmin from "@/components/NavAdmin";
import NavAdmin2 from "@/components/NavAdmin2";
import ProdukAdmin from "@/components/ProdukAdmin";
import axios from "axios";

export default {
  name: "DashboardAdmin",
  components: {
    NavAdmin,
    NavAdmin2,
    ProdukAdmin,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
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
