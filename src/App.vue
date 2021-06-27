<template>
  <div id="app">
    <navbar />
    <b-container class="p-5" id="app-container" fluid>
      <router-view />

      <!-- Loading -->
      <div class="w-100 d-flex justify-content-center">
        <b-spinner v-if="isLoading" variant="primary" />
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  components: {
    Navbar,
  },
  data: () => ({
    isLoading: false,
  }),
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.isLoading = true;
      this.$store
        .dispatch("fetchAllAreas")
        .then()
        .catch()
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
