<template>
  <div>
    <!-- Container -->
    <div
      class="w-100 d-flex flex-wrap justify-content-around mt-5"
      id="container-scroll"
      @scroll="handleScroll"
    >
      <b-input-group class="mt-5 mb-3">
        <b-form-input
          size="lg"
          placeholder="Search League"
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

      <div class="w-100 mb-4">
        <h1 class="hide-tablet">League List</h1>
        <h2 class="hide-desktop">League List</h2>
      </div>

      <div
        class="my-card mb-5 mx-1"
        v-for="({ name, id, emblemUrl }, i) in returnLeagues"
        :key="i"
      >
        <b-card
          class="p-3 bg-light"
          :img-src="
            emblemUrl
              ? emblemUrl
              : `https://m-tv.imgix.net/b949d9a77f6575beb96aa03ce32e6a7dd9fb3c0a6810d1dad000ccadb6e86c0c.png`
          "
          :img-alt="name"
          overlay
          @click="() => $router.push(`/clubs?league=${id}`)"
        />
        <div class="d-flex justify-content-center align-items-center my-2">
          <h5 class="text-break">
            <router-link :to="`/clubs?league=${id}`">
              {{ name }}
            </router-link>
          </h5>
        </div>
      </div>

      <!-- Loading -->
      <div class="w-100 d-flex justify-content-center">
        <b-spinner v-if="isLoading" variant="primary" />
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
  name: "League",
  data: () => ({
    isLoading: false,
    hoverIndex: null,
    showChevronUp: false,
    keyword: null,
    filterLeague: [],
    competitions: [],
  }),
  created() {
    // window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.loadLeagues();
  },
  watch: {
    keyword(after) {
      this.filterLeague = this.competitions.filter(
        (el) => el.name.toLowerCase().indexOf(after.toLowerCase()) > -1
      );
    },
  },
  computed: {
    returnLeagues() {
      if (this.filterLeague.length > 0) return this.filterLeague.reverse();

      return this.competitions.reverse();
    },
  },
  methods: {
    loadLeagues() {
      this.isLoading = true;

      get(`/competitions?areas=${this.$route.query.area}`)
        .then(({ data }) => {
          this.competitions = data.competitions;
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
        height: 20vh;

        @media only screen and (min-width: 600px) {
          width: 20vw;
          height: 15vh;
        }
        @media only screen and (min-width: 800px) {
          width: 10vw;
          height: 20vh;
        }
      }
    }
  }
}
</style>
