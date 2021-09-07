<template>
  <div class="keranjang">
    <Navbar :updateKeranjang="keranjangs" />
    <div class="keranjang mx-5">
      <div class="container-fluid">
        <!--Breadcrumb-->
        <div class="row mt-4">
          <div class="col">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/" class="text-dark">Home</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/produks" class="text-dark"
                    >Obat</router-link
                  >
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Keranjang
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h2 class="p-2">
              <strong>Keranjang Saya</strong>
            </h2>
            <div class="table-responsive mt-3">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Nama Obat</th>
                    <th scope="col">Jumlah</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Total Harga</th>
                    <th scope="col">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(keranjang, index) in keranjangs"
                    :key="keranjang.product._id"
                  >
                    <th>{{ index + 1 }}</th>

                    <td class="bg-success col-md-2 p-3">
                      <img
                        :src="keranjang.product.imageUrl"
                        class="img-fluid shadow"
                        width="200px"
                      />
                    </td>
                    <td class="col-md-3">
                      <strong>{{ keranjang.product.name }}</strong>
                    </td>
                    <td class="col-md-2">{{ keranjang.quantity }}</td>
                    <td class="col-md-3">Rp. {{ keranjang.product.price }}</td>
                    <td class="col-md-3">
                      <strong>
                        Rp.
                        {{ keranjang.product.price * keranjang.quantity }}
                      </strong>
                    </td>
                    <td class="text-danger col-md-3" align="center">
                      <b-icon-trash
                        @click="hapusKeranjang(keranjang.product._id)"
                      ></b-icon-trash>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="6" align="right">
                      <strong>Total Harga Pesanan :</strong>
                    </td>
                    <td colspan="1">
                      <strong>Rp.{{ totalHarga }}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Form Checkout -->
        <div class="row mb-4">
          <div class="col-md-10">
            <router-link to="/formbeli" class="btn btn-success float-right"
              >Check Out</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "Keranjang",
  components: {
    Navbar,
  },
  data() {
    return {
      keranjangs: [],
    };
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    hapusKeranjang(productId) {
      let data;
      jwt.verify(
        axios.defaults.headers.common["Authorization"].split(" ")[1],
        "ta_kel14",
        (err, decode) => {
          data = decode;
        }
      );

      const req = {
        userId: data._id,
        productId: productId,
      };

      axios
        .post(`http://localhost:8000/api/cart/remove/${req.productId}`, {
          userId: req.userId,
        })
        .then(() => {
          this.$toast.error("Sukses Hapus Keranjang", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          axios
            .post("http://localhost:8000/api/cart/", { userId: req.userId })
            .then((response) => {
              this.setKeranjangs(response.data);
            })

            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    },
  },
  mounted() {
    //method yg mengaktifkan suatu fungsi atau kejadian pada saat component itu dipanggil
    let data;
    jwt.verify(
      axios.defaults.headers.common["Authorization"].split(" ")[1],
      "ta_kel14",
      (err, decode) => {
        data = decode;
      }
    );

    const userId = data._id;

    axios
      .post("http://localhost:8000/api/cart/", { userId: userId })
      .then((response) => {
        this.setKeranjangs(response.data);
      })

      .catch((error) => console.error(error));
  },
  computed: {
    //menjumlahkan seluruh total harga
    totalHarga() {
      if (this.keranjangs.length == 0) {
        return 0;
      }
      const harga = this.keranjangs.reduce((total, data) => {
        return total + data.product.price * data.quantity;
      }, 0);

      return harga;
    },
  },
};
</script>
