<template>
  <nav class="navbar navbar-expand-lg bg-success navbar-light fixed-top px-3">
    <div class="container-fluid">
      <h3 class="navbar-brand text-white mr-auto">
        <strong>APOTEK GLEN</strong>
      </h3>
      <ul class="navbar-nav">
        <template v-if="isLoggedIn">
          <b-navbar-nav class="ml-auto">
            <div class="row g-0">
              <div class="col">
                <li class="nav-item">
                  <b-dropdown :text="adminName" variant="Secondary" menu-class="w-100">
                    <li class="user-footer">
                      <a href="/admin/profile" class="btn btn-default btn-flat">
                        <i class="fas fa-user text-success"></i> Profile
                      </a>
                      <a href="/" class="btn btn-default btn-flat">
                        <i class="fas fa-sign-out-alt text-success"></i> Sign out
                      </a>
                    </li>
                  </b-dropdown>
                </li>
              </div>
            </div>
          </b-navbar-nav>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavAdmin",
  data() {
    return {
      adminName: "admin",
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },
};
</script>

<style></style>
