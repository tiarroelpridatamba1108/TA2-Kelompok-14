<template>
  <div class="card h-100 border-3 shadow rounded-md">
    <div class="row g-0">
      <div class="col-md-5 card-img"></div>
      <div class="col-md-6">
        <div class="mt-4">
          <router-link
            :to="'/produks/:_id'"
            class="card-title font-weight-bold"
            style="font-size: 18px"
          ></router-link>

          <div class="price font-weight-bold mt-2" style="color: #2c2a2a; font-size: 15px">Rp.</div>
        </div>

        <div class="mt-4">
          <router-link
            class="btn btn-success btn-sm mt-3 btn-block"
            :to="'/produks/' + product._id"
          >Detail</router-link>
          <router-link class="btn btn-success btn-sm mt-2 btn-block" to="/keranjang">Beli</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPesanan",
};
</script>
