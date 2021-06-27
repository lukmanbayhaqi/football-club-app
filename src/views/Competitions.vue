<template>
  <div>
    <!-- Container -->
    <div
      class="w-100 d-flex flex-wrap justify-content-around mt-5"
      id="container-scroll"
      @scroll="handleScroll"
    >
      <!-- Search Box -->
      <b-input-group class="mt-5 mb-3" v-if="returnCompetitions.length > 0">
        <b-form-input
          size="lg"
          placeholder="Search Competitions"
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
      <div class="w-100 mb-4" v-if="returnCompetitions.length > 0">
        <h1 class="hide-tablet">Competitions List</h1>
        <h2 class="hide-desktop">Competitions List</h2>
      </div>

      <!-- List Competitions -->
      <div
        class="my-card mb-5 mx-1"
        v-for="({ name, id, emblemUrl }, i) in returnCompetitions"
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

      <!-- No Competitions placeholder -->
      <div class="w-100" v-if="!isLoading && returnCompetitions.length === 0">
        <b-img
          src="https://bambangpriantono.files.wordpress.com/2015/03/no-soccer.jpg"
          alt="no Competitions here"
        />
        <h2>There is no Football Competitions here</h2>
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
  name: "Competitions",
  data: () => ({
    isLoading: false,
    hoverIndex: null,
    showChevronUp: false,
    keyword: null,
    filterCompetitions: [],
    competitions: [],
  }),
  created() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    keyword(after) {
      this.filterCompetitions = this.$store.state.competitionList.filter(
        (el) => el.name.toLowerCase().indexOf(after.toLowerCase()) > -1
      );
    },
  },
  computed: {
    returnCompetitions() {
      if (this.filterCompetitions.length > 0)
        return this.filterCompetitions.reverse();

      return this.$store.state.competitionList.reverse();
    },
  },
  methods: {
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
