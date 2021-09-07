<template>
  <div>
    <!--(event listener)v-on:submit atau dapat disingkat @submit untuk mengirim formulir ketika kita menekan button submit-->
    <form @submit.prevent="submit">
      <!--event.preventDefault() adalah untuk mencegah agar browser tidak menggunakan metode POST/GET default 
    yang disediakan oleh formulir;dan browser tidak memuat ulang halaman.-->
      <div class="form-group">
        <label for="name">Nama Obat:</label>
        <input
          type="text"
          v-model="product.name"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="price">Harga Obat</label>
        <input
          type="number"
          v-model="product.price"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="stock">Stok Obat</label>
        <input
          type="number"
          v-model="product.stock"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="url">Gambar URL Obat</label>
        <input
          type="url"
          v-model="product.imageUrl"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="url">Deskripsi</label>
        <input
          type="text"
          v-model="product.description"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary mr-2">Submit</button>
      <button
        class="btn btn-danger"
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProdukForm",
  data() {
    return {
      product: {
        name: "",
        price: "",
        stock: "",
        imageUrl: "",
        description: "",
      },
    };
  },
  methods: {
    submit() {
      this.$emit("add-product", this.product);
      this.product = {
        name: "",
        price: "",
        stock: "",
        imageUrl: "",
        description: "",
      };
    },
  },
};
</script>