<template>
  <div class="formbeli">
    <Navbar />
    <div class="container">
      <!--Breadcrumb-->
      <div class="row mx-5">
        <div class="col">
          <form @submit.prevent="submit" class="mt-5">
            <h3>Form Pembelian</h3>
            <div class="row mb-2">
              <div class="col-md-12">
                <hr />
              </div>
            </div>
            <div class="row mb-2">
              <label for="nampen" class="col-sm-2 col-form-label"
                >Nama Penerima</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="receiverName"
                  required
                />
              </div>
            </div>
            <div class="row mb-2">
              <label for="hp" class="col-sm-2 col-form-label"
                >No.Handphone</label
              >
              <div class="col-sm-10">
                <input
                  type="number"
                  class="form-control"
                  v-model="phoneNumber"
                  required
                />
              </div>
            </div>
            <div class="row mb-2">
              <label for="alamat" class="col-sm-2 col-form-label"
                >Alamat Lengkap</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="address"
                  required
                />
              </div>
            </div>

            <div class="row mb-2">
              <label for="kodepos" class="col-sm-2 col-form-label"
                >Kodepos</label
              >
              <div class="col-sm-10">
                <input
                  type="number"
                  class="form-control"
                  v-model="postalCode"
                  required
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-12">
                <div class="card border-3 rounded shadow">
                  <div class="card-body">
                    <div>
                      <span class="col-md-2 font-weight-bold"
                        >Total Pembayaran :</span
                      >
                      <span class="col-md-6">{{ totalPrice }}</span>
                    </div>
                    <br />
                    <div class="mx-3">
                      <span class="font-weight-bold">Metode Pembayaran</span>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          value="cod"
                          v-model="paymentMethod"
                          required
                        />
                        <label class="form-check-label"
                          >COD (Cash On Delivery)</label
                        >

                        <br />
                        <input
                          class="form-check-input"
                          type="radio"
                          value="tf"
                          v-model="paymentMethod"
                          required
                        />
                        <label class="form-check-label">Transfer</label>
                      </div>
                    </div>
                    <div align="right">
                      <div class="col-md-12">
                        <input
                          type="button"
                          class="btn btn-success col-md-4"
                          @click="submit"
                          value="Pesan Sekarang"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
  name: "FormBeli",
  components: {
    Navbar,
  },
  data() {
    return {
      receiverName: "",
      address: "",
      phoneNumber: "",
      postalCode: "",
      paymentMethod: "",
      totalPrice: 0,
    };
  },
  methods: {
    setTotalPrice(totalPrice) {
      this.totalPrice = totalPrice;
    },
    submit() {
      if (
        (this.receiverName,
        this.address,
        this.phoneNumber,
        this.postalCode,
        this.paymentMethod)
      ) {
        //JWT
        let data;
        jwt.verify(
          axios.defaults.headers.common["Authorization"].split(" ")[1],
          "ta_kel14",
          (err, decode) => {
            data = decode;
          }
        );

        const post = {
          userId: data._id,
          receiverName: this.receiverName,
          address: this.address,
          phoneNumber: this.phoneNumber,
          postalCode: this.postalCode,
          paymentMethod: this.paymentMethod,
        };

        axios
          .post("http://localhost:8000/api/order/add", post)
          .then(() => {
            this.$router.push({
              path: "/pesanan",
            });
          })
          .catch((err) => console.error(err));
      }
    },
  },
  mounted() {
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
        const keranjang = response.data;

        let harga = 0;

        keranjang.forEach((data) => {
          harga += data.product.price * data.quantity;
        }, 0);

        this.setTotalPrice(harga);
      })
      .catch((error) => console.error(error));
  },
};
</script>
