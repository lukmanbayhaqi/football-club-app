<template>
  <div>
    <!-- Container -->
    <div
      class="w-100 d-flex flex-wrap justify-content-around mt-5"
      id="container-scroll"
      @scroll="handleScroll"
    >
      <!-- Go back button -->
      <div class="w-100 d-flex">
        <b-button class="mt-3" variant="primary" @click="() => $router.back()">
          Go Back
        </b-button>
      </div>

      <!-- Search Box -->
      <b-input-group class="mt-5 mb-3" v-if="returnClubs.length > 0">
        <b-form-input
          size="lg"
          placeholder="Search Clubs"
          v-model="keyword"
          debounce="1000"
          trim
        />

        <template #append>
          <b-button size="lg" variant="primary" class="mb-2" disabled>
            <b-icon icon="search" aria-label="search"></b-icon>
          </b-button>
        </template>
      </b-input-group>

      <!-- Information -->
      <div class="w-100 mb-4" v-if="returnClubs.length > 0">
        <h1 class="hide-tablet">Clubs List</h1>
        <h2 class="hide-desktop">Clubs List</h2>
      </div>

      <!-- List clubs -->
      <div
        class="my-card mb-5 mx-1"
        v-for="({ name, id, crestUrl }, i) in returnClubs"
        :key="i"
      >
        <b-card
          class="p-3"
          :img-src="
            crestUrl
              ? crestUrl
              : `https://m-tv.imgix.net/b949d9a77f6575beb96aa03ce32e6a7dd9fb3c0a6810d1dad000ccadb6e86c0c.png`
          "
          :img-alt="name"
          overlay
          @click="() => $router.push(`/team?id=${id}`)"
        />
        <div class="d-flex justify-content-center align-items-center my-2">
          <h5 class="text-break">
            <router-link :to="`/team?id=${id}`">
              {{ name }}
            </router-link>
          </h5>
        </div>
      </div>

      <!-- No Clubs placeholder -->
      <div class="w-100" v-if="!isLoading && returnClubs.length === 0">
        <b-img
          src="https://bambangpriantono.files.wordpress.com/2015/03/no-soccer.jpg"
          alt="no League here"
        />
        <h2>There is no Football Clubs here</h2>
      </div>

      <!-- Loading -->
      <div class="w-100 d-flex justify-content-center">
        <b-spinner
          v-if="!$store.state.globalLoading && isLoading"
          variant="primary"
        />
      </div>
    </div>

    <!-- Floating Action Button -->
    <div class="btn-group-fab" role="group" aria-label="FAB Menu">
      <button
        v-if="showChevronUp"
        type="button"
        class="btn btn-main btn-primary has-tooltip"
        data-placement="left"
        title="Menu"
        @click="handleScrollToTop"
      >
        <h4><b-icon icon="chevron-up" color="white" /></h4>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clubs",
  data: () => ({
    isLoading: false,
    hoverIndex: null,
    showChevronUp: false,
    keyword: null,
    filterClubs: [],
    clubs: [],
  }),
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.loadClubs();
  },
  watch: {
    keyword(after) {
      this.filterClubs = this.clubs.filter(
        (el) => el.name.toLowerCase().indexOf(after.toLowerCase()) > -1
      );
    },
  },
  computed: {
    returnClubs() {
      if (this.filterClubs.length > 0) return this.filterClubs;

      return this.clubs;
    },
  },
  methods: {
    loadClubs() {
      this.isLoading = true;

      get(`/competitions/${this.$route.query.league}/teams?season=2021`)
        .then(({ data }) => {
          this.clubs = data.teams;
        })
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    },
    handleScroll(e) {
      let { scrollTop } = e.srcElement.scrollingElement;
      if (scrollTop > 300) this.showChevronUp = true;
      else this.showChevronUp = false;
    },
    handleScrollToTop() {
      let scroll = document.getElementById("app");
      scroll?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  .card {
    .position-relative {
      .card-img {
        width: 50vw;
        height: 25vh;

        @media only screen and (min-width: 600px) {
          width: 20vw;
          height: 20vh;
        }
        @media only screen and (min-width: 800px) {
          width: 10vw;
          height: 25vh;
        }
      }
    }
  }
}
</style>
