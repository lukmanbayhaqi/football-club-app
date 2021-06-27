<template>
  <div @scroll="handleScroll" class="mt-5">
    <!-- Container -->
    <div
      class="row d-flex justify-content-center align-items-center"
      style="height: 50vh;"
      @scroll="handleScroll"
    >
      <!-- Go back button -->
      <div v-if="!isLoading" class="w-100 d-flex">
        <b-button class="mt-3" variant="primary" @click="() => $router.back()">
          Go Back
        </b-button>
      </div>

      <b-spinner
        v-if="!$store.state.globalLoading && isLoading"
        variant="primary"
      />
      <div class="col-lg-12" v-else>
        <div class="row my-5" v-if="!isError">
          <div
            class="col-lg-4 d-flex justify-content-center align-items-center flex-column"
          >
            <b-img
              :src="
                detail.crestUrl
                  ? detail.crestUrl
                  : `https://m-tv.imgix.net/b949d9a77f6575beb96aa03ce32e6a7dd9fb3c0a6810d1dad000ccadb6e86c0c.png`
              "
              fluid
              :alt="detail.name + ' logo'"
            />
          </div>
          <div class="col-lg-8 d-flex flex-column align-items-start">
            <h1 class="hide-tablet">
              <strong>{{ detail.name }}</strong>
            </h1>
            <h1 class="hide-desktop my-3 w-100">
              <strong>{{ detail.name }}</strong>
            </h1>
            <hr />
            <h5 class="left">Venue: {{ detail.venue }}</h5>
            <hr />
            <h5 class="left">Address: {{ detail.address }}</h5>
            <hr />
            <h5 class="left">
              Website:
              <a :href="detail.website" target="_blank" style="color: blue">
                {{ detail.website }}
              </a>
            </h5>
            <hr />
            <h5 class="left">Email: {{ detail.email }}</h5>
            <hr />
            <h5 class="left">Since: {{ detail.founded }}</h5>
            <hr />
            <section class="d-flex">
              <h5 class="left">Active Competitions :</h5>
              <h5 class="ml-3" v-if="detail.activeCompetitions.length === 0">
                -
              </h5>
              <section
                v-for="({ name }, i) in detail.activeCompetitions"
                :key="i"
                class="ml-1"
              >
                <h5 class="left">
                  {{ name }}
                  {{ i !== detail.activeCompetitions.length - 1 ? "," : "" }}
                </h5>
              </section>
            </section>
            <hr />
            <!-- <h6>Growth Rate: {{ detail.growth_rate.name }}</h6>
            <hr />
            <h6>Habitat: {{ detail.habitat.name }}</h6>
            <hr /> -->
          </div>
        </div>
        <div class="row" v-if="!isError">
          <div class="col-lg-12">
            <h1><strong>Squad List</strong></h1>
          </div>
          <div class="w-100 d-flex flex-wrap justify-content-around mt-5">
            <div
              class="my-card mb-5 mx-1"
              v-for="({ name, id, imageUrl }, i) in returnSquad"
              :key="i"
            >
              <b-card
                class=""
                :img-src="
                  imageUrl
                    ? imageUrl
                    : `http://getdrawings.com/img/standing-silhouette-26.jpg`
                "
                :img-alt="name"
                overlay
                @click="() => $router.push(`/player?id=${id}`)"
              />
              <div
                class="d-flex justify-content-center align-items-center my-2"
              >
                <h5 class="text-break">
                  <router-link :to="`/player?id=${id}`">
                    {{ name }}
                  </router-link>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <!-- No Clubs placeholder -->
        <div class="w-100" v-if="!isLoading && isError">
          <b-img
            src="https://bambangpriantono.files.wordpress.com/2015/03/no-soccer.jpg"
            alt="no League here"
          />
          <h2>There is no Football team here</h2>
        </div>
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
  name: "Team",
  data: () => ({
    isLoading: true,
    detail: {},
    showChevronUp: false,
    isError: true,
  }),
  created() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.fetchDetailTeam();
  },
  computed: {
    returnSquad() {
      return this.$store.state.squadList;
    },
  },
  methods: {
    fetchDetailTeam() {
      this.isLoading = true;
      this.isError = false;

      get(`/teams/${this.$route.query.id}`)
        .then(({ data }) => {
          this.detail = data;
        })
        .catch((err) => (this.isError = true))
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
  width: 80vw;

  @media only screen and (min-width: 600px) {
    width: 40vw;
  }
  @media only screen and (min-width: 800px) {
    width: 30vw;
  }
}
</style>
