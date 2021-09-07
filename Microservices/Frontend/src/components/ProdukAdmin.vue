<template>
  <b-card
    :img-src="product.imageUrl"
    img-alt="card image"
    img-height="150px"
    img-left
    class="p-2 card shadow"
  >
    <b-card-text>
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">Rp. {{ product.price }}</p>
      <div class="mt-4">
        <router-link
          class="btn btn-success btn-sm mt-3 btn-block shadow-sm"
          :to="'/admin/produks/' + product._id"
          >Detail</router-link
        >
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "ProdukAdmin",
  props: ["product"],
};
</script>

<style></style>
