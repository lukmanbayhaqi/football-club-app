<template>
  <div id="app">
    <navbar />
    <b-container class="p-5" id="app-container" fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  components: {
    Navbar,
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.dispatch("fetchAllAreas");
      // get("https://api.football-data.org/v2/areas").then(({ data }) => {
      //   console.log(data.areas);
      //   // resolve(true);
      // });
      // .catch((err) => reject(err));
    },
  },
};
</script>
