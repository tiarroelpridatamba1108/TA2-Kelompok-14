<template>
  <div class="pesanan">
    <Navbar />
    <div class="row no-gutters">
      <Sidebar />
      <div class="col-md-10 p-5">
        <h3 class="mb-3 text-success">Pesanan</h3>
        <hr />
        <div class="row g-0">
          <div class="col-md-12">
            <div class="card-body border">
              <table class="table table-borderless mt-3">
                <tbody>
                  <tr v-for="pemesanan in pemesanans" :key="pemesanan._id">
                    <div class="row">
                      <div class="col-md-12">
                        <td>Nama Penerima</td>
                        <td>:</td>
                        <td class="font-weight-bold">
                          {{ pemesanan.receiverName }}
                        </td>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <td>Alamat yang dituju</td>
                        <td>:</td>
                        <td class="font-weight-bold">
                          {{ pemesanan.address }}
                        </td>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <td>Tanggal Pesanan</td>
                        <td>:</td>
                        <td class="font-weight-bold">
                          {{ pemesanan.orderDate }}
                        </td>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <td>Total pembayaran</td>
                        <td>:</td>
                        <td class="font-weight-bold">
                          {{ pemesanan.totalPrice }}
                        </td>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <td>Nomor Rekening</td>
                        <td>:</td>
                        <td class="font-weight-bold">
                          Bank BRI-1234152662772, An: Apotek Glen
                        </td>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <td>Status</td>
                        <td>:</td>
                        <td
                          v-if="pemesanan.paymentStatus == 'A'"
                          class="font-weight-bold text-success"
                        >
                          Pembayaran Diterima
                        </td>
                        <td
                          v-if="pemesanan.paymentStatus == 'R'"
                          class="font-weight-bold text-danger"
                        >
                          Pembayaran Ditolak
                        </td>
                        <td
                          v-else-if="pemesanan.paymentStatus == 'C'"
                          class="font-weight-bold text-warning"
                        >
                          Pesanan dibatalkan
                        </td>
                        <td
                          v-else-if="pemesanan.paymentStatus == 'W'"
                          class="font-weight-bold text-primary"
                        >
                          Menunggu persetujuan
                        </td>
                        <td
                          v-else-if="pemesanan.paymentStatus == 'P'"
                          class="font-weight-bold text-secondary"
                        >
                          Menunggu pembayaran
                        </td>
                      </div>
                    </div>
                    <div class="row p-3" align="center">
                      <router-link
                        :to="'/uploadBayar/' + pemesanan._id"
                        class="btn btn-success col-md-4 m-2"
                        >Konfirmasi Pembayaran</router-link
                      >
                      <button
                        @click="cancelPayment(pemesanan._id)"
                        class="btn btn-danger col-md-4 m-2"
                      >
                        Batalkan pembayaran
                      </button>
                    </div>

                    <hr />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "Pesanan",
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      pemesanans: [],
    };
  },
  methods: {
    setOrder(data) {
      this.pemesanans = data;
    },
    cancelPayment(id) {
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
        orderId: id,
      };

      //Update tampilan
      axios
        .put("http://localhost:8000/api/order/cancel", req)
        .then(() => {
          axios
            .post("http://localhost:8000/api/order/", { userId: data._id })
            .then((result) => {
              const orders = result.data;
              orders.forEach((order) => {
                order.totalPrice = 0;

                order.products.forEach((item) => {
                  order.totalPrice += item.product.price * item.quantity;
                });
              });

              this.setOrder(orders);
            });
        })
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    if (this.$route.query.success) {
      this.$toast.success("Berhasil", {
        type: "success",
        position: "top-right",
        //millisecond
        dismissible: true,
      });
    }
    let data;
    jwt.verify(
      axios.defaults.headers.common["Authorization"].split(" ")[1],
      "ta_kel14",
      (err, decode) => {
        data = decode;
      }
    );

    axios
      .post("http://localhost:8000/api/order/", { userId: data._id })
      .then((result) => {
        const orders = result.data;
        orders.forEach((order) => {
          order.totalPrice = 0;

          order.products.forEach((item) => {
            order.totalPrice += item.product.price * item.quantity;
          });
        });

        this.setOrder(orders);
      })
      .catch((err) => console.error(err));
  },
};
</script>
