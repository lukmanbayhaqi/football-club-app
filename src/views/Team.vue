<template>
  <div @scroll="handleScroll" class="mt-5">
    <!-- Container -->
    <div
      class="row d-flex align-items-center"
      style="height: 50vh;"
      @scroll="handleScroll"
    >
      <b-spinner v-if="isLoading" variant="primary" />
      <div class="col-lg-12" v-else>
        <div class="row my-5">
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
            <h1>{{ detail.name }}</h1>
            <hr />
            <h5>Venue: {{ detail.venue }}</h5>
            <hr />
            <h5>Address: {{ detail.address }}</h5>
            <hr />
            <h5>
              Website:
              <a :href="detail.website" target="_blank" style="color: blue">
                {{ detail.website }}
              </a>
            </h5>
            <hr />
            <h5>Email: {{ detail.email }}</h5>
            <hr />
            <h5>Since: {{ detail.founded }}</h5>
            <hr />
            <section class="d-flex">
              <h5>Active Competitions :</h5>
              <section
                v-for="({ name }, i) in detail.activeCompetitions"
                :key="i"
                class="ml-1"
              >
                <h5>
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
        <!-- <div class="row">
          <div class="col-lg-12">
            <h1>Squad List</h1>
          </div>
          <div class="col-lg-12">

          </div>
        </div> -->
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
  computed: {},
  methods: {
    fetchDetailTeam() {
      this.isLoading = true;
      get(`/teams/${this.$route.query.id}`)
        .then(({ data }) => {
          this.detail = data;
        })
        .catch(console.log)
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

<style></style>
