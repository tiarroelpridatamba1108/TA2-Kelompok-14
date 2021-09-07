<template>
  <div class="card h-100 border-2 shadow rounded-md">
    <div class="row g-0">
      <div class="col-md-6 card-img p-3">
        <img
          :src="product.imageUrl"
          class="w-40"
          style="height: 12em; object-fit: cover"
        />
      </div>
      <div class="col-md-6">
        <div class="p-3">
          <div class="name" style="color: #0b5500; font-size: 18px">
            {{ product.name }}
          </div>

          <div
            class="price font-weight-bold mt-2"
            style="color: #2c2a2a; font-size: 15px"
          >
            Rp. {{ product.price }}
          </div>

          <div class="mt-4">
            <router-link
              class="btn btn-success btn-md btn-block shadow-sm"
              :to="'/produks/' + product._id"
              >Detail</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduk",
  props: ["product"],
};
</script>

<style></style>
