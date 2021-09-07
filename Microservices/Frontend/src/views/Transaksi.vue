<template>
  <div>
    <NavAdmin />
    <div class="row no-gutters">
      <NavAdmin2 />
      <div class="col-md-10 p-5">
        <h3 class="mt-5 text-success">Daftar Transaksi</h3>
        <hr />
        <table class="table table-bordered">
          <thead class="thead-dark text-center">
            <tr>
              <th scope="col">ID Pemesanan</th>
              <th scope="col">Nama Pembeli</th>
              <th scope="col">Total Pembayaran</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in Orders" :key="order._id">
              <td align="right">{{ index + 1 }}</td>
              <td>{{ order.receiverName }}</td>
              <td align="right">{{ order.totalPrice }}</td>
              <td class="text-center">
                <router-link
                  :to="'/admin/detailtransaksi/' + order._id"
                  class="btn btn-primary"
                >
                  <b-icon-eye></b-icon-eye>Lihat Detail
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import NavAdmin from "@/components/NavAdmin";
import NavAdmin2 from "@/components/NavAdmin2";
import axios from "axios";

export default {
  name: "Transaksi",
  components: {
    NavAdmin,
    NavAdmin2,
  },
  data() {
    return {
      Orders: [],
    };
  },
  methods: {
    setOrders(data) {
      this.Orders = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/order/admin/")
      .then((response) => {
        const orders = response.data;
        orders.forEach((order) => {
          order.totalPrice = 0;

          order.products.forEach((item) => {
            order.totalPrice += item.product.price * item.quantity;
          });
        });

        this.setOrders(orders);
      })
      .catch((error) => console.log(error));
  },
};
</script>
