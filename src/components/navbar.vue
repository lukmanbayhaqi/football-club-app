<template>
  <b-navbar
    class="navbar-football border"
    toggleable="lg"
    type="dark"
    variant="light"
  >
    <b-navbar-brand class="p-0" @click="() => $router.push('/')">
      <div class="d-flex">
        <img
          class="football-logo"
          src="../assets/footict.png"
          alt="football-logo"
        />
        <!-- <h2>Football Club List</h2> -->
      </div>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="mt-2 ml-3" @click="changePage('/')">
          <div class="d-flex flex-row align-items-center">
            <h5 style="color: black">
              <b-icon icon="house-door" class="mr-2" />
              <b>Home</b>
            </h5>
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    changePage(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style lang="scss">
.football-logo {
  width: 45vw;
  @media only screen and (min-width: 600px) {
    width: 30vw;
  }
  @media only screen and (min-width: 800px) {
    width: 13vw;
  }
}

.navbar-football {
  position: fixed !important;
  width: 100% !important;
  z-index: 100 !important;

  .navbar-toggler {
    background-color: grey;
  }
}
</style>
