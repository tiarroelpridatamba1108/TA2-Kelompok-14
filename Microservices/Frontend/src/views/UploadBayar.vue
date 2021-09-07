<template>
  <div class="formbeli">
    <Navbar />
    <div class="row no-gutters">
      <Sidebar />
      <div></div>

      <div class="col-md-10 p-5">
        <h3>Upload Bukti Pembayaran</h3>
        <hr />
        <div class="card border-2 rounded shadow">
          <div class="card-body p-4">
            <button class="btn btn-primary" @click="onPickFile">
              choose a photo
            </button>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="previewImage"
              accept="image/*"
            />
            <div align="center" v-if="image != null || imageUrl != null">
              <img class="preview" widht="100" height="100" :src="imageUrl" />
              <br />
              <button class="btn btn-success" @click="onUpload">
                Upload image
              </button>
            </div>
          </div>
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
import firebase from "firebase";

export default {
  name: "UploadBayar",
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      imageUrl: null,
      image: null,
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.imageUrl = null;

      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(file);
      this.image = file;
    },
    onUpload() {
      let data;
      jwt.verify(
        axios.defaults.headers.common["Authorization"].split(" ")[1],
        "ta_kel14",
        (err, decode) => {
          data = decode;
        }
      );

      const fileName = this.$route.params.id;

      const storageRef = firebase.storage().ref(fileName).put(this.image);

      let post = {
        userId: data._id,
        orderId: this.$route.params.id,
      };

      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            post.imageUrl = url;

            axios
              .post("http://localhost:8000/api/order/payment", post)
              .then(() => {
                this.$router.push({
                  path: "/pesanan",
                });
              })
              .catch((err) => console.error(err));
          });
        }
      );
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

    axios
      .post(`http://localhost:8000/api/order/${this.$route.params.id}`, {
        userId: data._id,
      })
      .then((result) => (this.imageUrl = result.data.paymentCheck))
      .catch((err) => console.error(err));
  },
};
</script>