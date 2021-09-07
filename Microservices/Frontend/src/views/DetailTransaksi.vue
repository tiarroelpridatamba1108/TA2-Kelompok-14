<template>
  <div>
    <NavAdmin />
    <div class="row no-gutters">
      <NavAdmin2 />
      <div class="col-md-10 p-5 mt-5">
        <br />
        <div class="card border-2 shadow">
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
                <h4 class="text-success font-weight-bold ml-2">
                  Detail Transaksi
                </h4>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td>Daftar Produk Pesanan:</td>
                      <td class="font-weight-bold"></td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Nama Produk</td>
                      <td class="font-weight-bold">Harga</td>
                      <td class="font-weight-bold">Kuantitas</td>
                      <td class="font-weight-bold">Total</td>
                    </tr>
                    <tr v-for="item in order.products" :key="item._id">
                      <td>{{ item.product.name }}</td>
                      <td>{{ item.product.price }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.quantity * item.product.price }}</td>
                    </tr>

                    <br />

                    <tr>
                      <td>Alamat Tujuan :</td>
                      <td class="font-weight-bold">{{ order.address }}</td>
                    </tr>
                    <tr>
                      <td>Bukti Pembayaran :</td>
                      <td v-if="order.paymentCheck != null">
                        <img
                          class="preview"
                          widht="100"
                          height="100"
                          :src="order.paymentCheck"
                        />
                      </td>
                    </tr>
                    <div class="row">
                      <button
                        class="btn btn-success col m-3"
                        @click="acceptPayment()"
                      >
                        Terima
                      </button>
                      <button
                        class="btn btn-danger col m-3"
                        @click="rejectPayment()"
                      >
                        Tolak
                      </button>
                    </div>
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
import NavAdmin2 from "@/components/NavAdmin2";
import axios from "axios";

export default {
  name: "DetailTransanksi",
  components: {
    NavAdmin,
    NavAdmin2,
  },
  data() {
    return {
      order: {},
    };
  },
  methods: {
    setOrders(data) {
      this.order = data;
    },
    acceptPayment() {
      axios
        .post("http://localhost:8000/api/order/admin/accept", {
          orderId: this.order._id,
        })
        .then(() =>
          this.$router.push({
            path: "/admin/transaksi",
          })
        )
        .catch((err) => console.error(err));
    },
    rejectPayment() {
      axios
        .post("http://localhost:8000/api/order/admin/reject", {
          orderId: this.order._id,
        })
        .then(() =>
          this.$router.push({
            path: "/admin/transaksi",
          })
        )
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8000/api/order/admin/${this.$route.params.id}`)
      .then((response) => this.setOrders(response.data))
      .catch((error) => console.error(error));
  },
};
</script>
