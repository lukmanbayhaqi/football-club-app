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
        <b-nav-item active class="mt-2 ml-3" @click="changePage('/')">
          <div class="d-flex flex-row align-items-center">
            <b-icon
              icon="house-fill"
              class="mr-2"
              style="color: black; width: 2vw: height: 3vh"
            />
            <h3 style="color: black; font-weight: 600;">
              Home
            </h3>
          </div>
        </b-nav-item>
        <b-nav-item class="mt-2 ml-3" @click="changePage('/competitions')">
          <div class="d-flex flex-row align-items-center">
            <b-icon
              icon="globe"
              class="mr-2"
              style="color: black; width: 2vw: height: 3vh"
            />
            <h3 style="color: black; font-weight: 600;">
              Competitions
            </h3>
          </div>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <div class="w-100 d-flex" v-if="returnPage === '/player'">
            <b-button
              class="mt-3"
              variant="primary"
              @click="() => $router.back()"
            >
              Go Back
            </b-button>
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    returnPage() {
      return this.$route.path;
    },
  },
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
