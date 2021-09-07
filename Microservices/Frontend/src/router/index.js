import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index.js';
import Produk from '@/views/Produk';
import ProdukDetail from '@/views/ProdukDetail';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/admin/daftarPengguna',
    name: 'DaftarPengguna',
    component: () => import('../views/DaftarPengguna.vue'),
  },
  {
    path: '/produks',
    name: 'Produk',
    component: Produk,
  },
  {
    path: '/produks/:_id',
    name: 'ProdukDetail',
    component: ProdukDetail,
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: () => import('../views/Keranjang.vue'),
  },
  {
    path: '/pesanan',
    name: 'Pesanan',
    component: () => import('../views/Pesanan.vue'),
  },
  {
    path: '/formbeli',
    name: 'FormBeli',
    component: () => import('../views/FormBeli.vue'),
  },
  {
    path: '/uploadBayar/:id',
    name: 'UploadBayar',
    component: () => import('../views/UploadBayar.vue'),
  },
  {
    path: '/terimakasih',
    name: 'Terimkasih',
    component: () => import('../views/Terimakasih.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/editprofileUser',
    name: 'editprofileUser',
    component: () => import('../views/EditProfile.vue'),
  },
  {
    path: '/admin/profile',
    name: 'ProfileAdmin',
    component: () => import('../views/ProfileAdmin.vue'),
  },
  {
    path: '/admin/dashboardproduk',
    name: 'DashboardAdmin',
    component: () => import('../views/DashboardAdmin.vue'),
  },
  {
    path: '/admin/createproduk',
    name: 'CreateProduk',
    component: () => import('../views/CreateProduk.vue'),
  },
  {
    path: '/admin/daftarproduk',
    name: 'DaftarProduk',
    component: () => import('../views/DaftarProduk.vue'),
  },
  {
    path: '/admin/produks',
    name: 'DetailAdminProduk',
    component: () => import('../views/DetailAdminProduk.vue'),
  },
  {
    path: '/admin/transaksi',
    name: 'Transaksi',
    component: () => import('../views/Transaksi.vue'),
  },
  {
    path: '/admin/detailtransaksi/:id',
    name: 'DetailTransaksi',
    component: () => import('../views/DetailTransaksi.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (store.getters.isLoggedIn && store.getters.user) {
      next();
      return;
    }
    next('/login');
  }

  if (to.matched.some((record) => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/profile');
  }
  // if (to.matched.some(record => record.meta.guest)) {
  //   if (!store.getters.isLoggedIn) {
  //     next()
  //     return
  //   }
  //   next('/pesanan')
  // }
  // if (to.matched.some(record => record.meta.guest)) {
  //   if (!store.getters.isLoggedIn) {
  //     next()
  //     return
  //   }
  //   next('/pembayaran')
  // }
  else {
    next();
  }
});

export default router;
