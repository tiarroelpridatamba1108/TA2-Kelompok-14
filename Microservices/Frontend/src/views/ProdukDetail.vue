<template>
  <div class="produk_detail">
    <Navbar />
    <div class="mx-5">
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
                  Obat Dipesan
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div class="row p-3" align="center">
          <div class="border-2 rounded shadow col-md-4 p-5 bg-success">
            <img
              :src="product.imageUrl"
              class="img-fluid shadow p-3"
              width="300px"
            />
          </div>

          <div class="col-md-8">
            <div class="card border-2 rounded shadow">
              <div class="card-body p-4">
                <table class="table table-borderless mt-3">
                  <tbody>
                    <tr>
                      <td>Nama Obat</td>
                      <td>:</td>
                      <td class="font-weight-bold">{{ product.name }}</td>
                    </tr>
                    <tr>
                      <td>Harga Obat</td>
                      <td>:</td>
                      <td class="font-weight-bold">{{ product.price }}</td>
                    </tr>
                    <tr>
                      <td>Deskripsi</td>
                      <td>:</td>
                      <td class="font-weight-bold">
                        {{ product.description }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <form v-on:submit.prevent>
                  <div class="form-group">
                    <!--apabila di refress maka tidak terjadi reload-->
                    <label for="quantity">Jumlah Pesanan :</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      class="form-control col-md-10"
                      v-model="pesan.jumlah_pemesanan"
                    />
                  </div>

                  <!--pemesanan merupakan method-->
                  <button
                    type="submit"
                    class="btn btn-info mx-4"
                    @click="pemesanan"
                  >
                    <i class="fa fa-shopping-/"></i> | Masukkan Keranjang
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import axios from "axios";
import jwt from "jsonwebtoken";
export default {
  name: "ProdukDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      product: {}, // menampilkan 1 data berupa objek
      pesan: {}, //data pesan ditampung
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    pemesanan() {
      if (this.pesan.jumlah_pemesanan > 0) {
        this.pesan.products = this.product;

        //JWT
        let data;
        jwt.verify(
          axios.defaults.headers.common["Authorization"].split(" ")[1],
          "ta_kel14",
          (err, decode) => {
            data = decode;
          }
        );

        const userId = data._id;
        this.pesan.userId = userId; //userId merupakan penampung
        this.pesan.productId = this.product._id;
        this.pesan.quantity = parseInt(this.pesan.jumlah_pemesanan);
        // //Ini cara hansen
        axios
          .put("http://localhost:8000/api/cart/", this.pesan)
          .then(() => {
            this.$router.push({ path: "/keranjang" });
            this.$toast.success("Berhasil Masuk Keranjang", {
              type: "success",
              position: "top-right",
              duration: 3000, //millisecond
              dismissible: true,
            });
          })
          .catch((err) => console.error(err));
        //Ini cara kakak yang jago vue itu yang di telegram itu
        // axios
        //   .post("http://localhost:8000/api//", { userId: userId })
        //   .then((response) => {
        //     console.error(response.data);
        //     const items = response.data;
        //     let sameProduct = items.find((item) => {
        //       return this.product._id === item.product._id;
        //     });
        //     if (sameProduct) {
        //       this.pesan.quantity += parseInt(sameProduct.quantity);
        //     }
        //     axios
        //       .put("http://localhost:8000/api//", this.pesan) //this.pesan = data yang dikirim ke keranjang
        //       .then(() => {
        //         this.$router.push({ path: "/keranjang" });
        //         // console.error("Berhasil");
        //         this.$toast.success("Berhasil Masuk Keranjang", {
        //           type: "success",
        //           position: "top-right",
        //           duration: 3000, //millisecond
        //           dismissible: true,
        //         });
        //       })
        //       .catch((err) => console.error(err));
        // });
      } else {
        this.$toast.error("Jumlah Pesanan Harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8000/api/product/${this.$route.params._id}`)
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.error(error));
  },
};
</script>
