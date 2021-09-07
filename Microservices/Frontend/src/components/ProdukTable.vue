<template>
  <div>
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nama Obat</th>
          <th scope="col">Harga</th>
          <th scope="col">Stock</th>
          <th scope="col">Gambar URL Obat</th>
          <th scope="col">Deskripsi</th>
          <th scope="col">Tindakan</th>
        </tr>
      </thead>
      <tbody>
        <!--Mengedit Data Produk-->

        <!--merender data array dari props produks dan membuat loop-->
        <tr v-for="product in products" :key="product._id">
          <!--product = alias dari properti products, menampilkan daftar item/value dari data array yang ditampilkan.-->
          <template v-if="productId === product._id">
            <td>
              <div>
                <!--V-model adalah untuk membuat two-way data binding atau data binding dua arah antara inputan dan komponen. 
                Dimana secara otomatis akan menyimpan dan memperbaharui data yang kita input di properti data komponen.-->
                <textarea
                  type="text"
                  v-model="product.name"
                  class="form-control"
                  rows="3"
                />
              </div>
            </td>
            <td>
              <div>
                <textarea
                  type="text"
                  v-model="product.price"
                  class="form-control"
                  rows="5"
                />
              </div>
            </td>
            <td>
              <div>
                <textarea
                  type="text"
                  v-model="product.stock"
                  class="form-control"
                  rows="3"
                />
              </div>
            </td>
            <td>
              <div>
                <!--<input type="url" v-model="product.imageUrl" class="form-control"/>-->
                <textarea
                  class="form-control"
                  v-model="product.imageUrl"
                  rows="3"
                ></textarea>
              </div>
            </td>
            <td>
              <div>
                <textarea
                  type="text"
                  v-model="product.description"
                  class="form-control"
                  rows="3"
                />
              </div>
            </td>
            <td>
              <div class="text-center p-2">
                <button class="btn btn-success" @click="saveEdit(product)">
                  Save
                </button>
                <button class="btn btn-danger" @click="cancelEdit(product)">
                  Cancel
                </button>
              </div>
            </td>
          </template>
          <!--v-if v-else untuk menyembunyikan dan menampilkannya-->
          <template v-else>
            <td class="col-2">{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td class="col-md-2">{{ product.imageUrl }}</td>
            <td>{{ product.description}}</td>
            <td>
              <div class="text-center p-2">
                <div class="btn btn-primary" @click="editProduct(product)">
                  Edit
                </div>
                <div class="btn btn-danger" @click="deleteProduct(product._id)">
                  Delete
                </div>
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProdukTable",
  //cara kita meneruskan data dari komponen induk(CreateProduk) ke komponen anak(ProdukTable)
  props: {
    products: Array,
  },
  data() {
    return {
      productId: null,
    };
  },
  methods: {
    editProduct(product) {
      this.data = Object.assign({}, product);
      this.productId = this.data._id;
      console.log(product);
    },
    saveEdit(product) {
      this.$emit("edit-product", product);
      this.productId = null;
    },
    cancelEdit(product) {
      Object.assign(product, this.data);
      console.log(this.productId);
      this.productId = null;
    },
    deleteProduct(_id) {
      this.$emit("delete-product", _id);
    },
  },
};
</script>