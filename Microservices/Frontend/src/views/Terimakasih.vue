<template>
  <div class="formbeli">
    <Navbar />
    <div class="row no-gutters">
      <Sidebar />
      <div class="col-md-10 p-5">
        <h2 align="center">Terima Kasih !!!</h2>
        <hr class="border" />
        <div align="center" class="m-4">
          <h5>Telah Melakukan Pemesanan, Mohon Tunggu Konfirmasi Pemesanan</h5>
          <router-link to="/" class="btn btn-success col-md-4 m-3"
            >Kembali Ke Dashboard</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "FormBeli",
  components: {
    Navbar,
    Sidebar,
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

        this.$router.push({ path: "/pesanan" });

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
            this.$toast.success("Berhasil", {
              type: "success",
              position: "top-right",
              duration: 3000, //millisecond
              dismissible: true,
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
        const harga = response.data.reduce((total, data) => {
          return total + data.product.price * data.quantity;
        }, 0);

        this.setTotalPrice(harga);
      })
      .catch((err) => console.error(err));
  },
};
</script>