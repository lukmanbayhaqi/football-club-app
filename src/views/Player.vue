<template>
  <div class="mt-5">
    <div class="my-card w-100 my-5">
      <b-img
        class="w-100"
        fluid
        :src="
          playerDetail.imageUrl
            ? playerDetail.imageUrl
            : `http://getdrawings.com/img/standing-silhouette-26.jpg`
        "
        :alt="playerDetail.name"
      />
    </div>
    <div
      class="player-profile-computer row d-flex justify-content-between w-100 px-5"
    >
      <div class="profile hide-tablet">
        <h1 class="player-name left">
          {{ playerDetail.name }}
        </h1>
      </div>
      <div class="profile hide-tablet">
        <div class="detail-player left">
          <small>Position</small>
          <h4>{{ playerDetail.position }}</h4>
        </div>
        <br />
        <div class="detail-player left">
          <small>Age</small>
          <h4>{{ returnPlayerAge(playerDetail.dateOfBirth) }}</h4>
        </div>
        <br />
        <div class="detail-player left">
          <small>Country of Birth</small>
          <h4>{{ playerDetail.countryOfBirth }}</h4>
        </div>
        <br />
        <div class="detail-player left">
          <small>Nationality</small>
          <h4>{{ playerDetail.nationality }}</h4>
        </div>
        <br />
      </div>
    </div>
    <div class="empty-box hide-desktop"></div>
    <div class="player-profile-mobile hide-desktop">
      <div class="profile">
        <h1 class="player-name">
          <strong>{{ playerDetail.name }}</strong>
        </h1>
        <hr />
      </div>
      <div>
        <div class="d-flex">
          <h6>Position :</h6>
          <h6 class="ml-3">{{ playerDetail.position }}</h6>
        </div>
        <hr />
        <div class="d-flex">
          <h6>Age :</h6>
          <h6 class="ml-3">{{ returnPlayerAge(playerDetail.dateOfBirth) }}</h6>
        </div>
        <hr />
        <div class="d-flex">
          <h6>Country of Birth :</h6>
          <h6 class="ml-3">{{ playerDetail.countryOfBirth }}</h6>
        </div>
        <hr />
        <div class="d-flex">
          <h6>Nationality :</h6>
          <h6 class="ml-3">{{ playerDetail.nationality }}</h6>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Player",
  data: () => ({
    playerDetail: {},
  }),
  mounted() {
    this.getPlayerDetail();
  },
  computed: {
    returnSquad() {
      return this.$store.state.squadList.filter(
        (el) => el.id == this.$route.query.id
      );
    },
  },
  methods: {
    getPlayerDetail() {
      const player = this.returnSquad.find(
        (el) => el.id == this.$route.query.id
      );

      if (player) this.playerDetail = player;
      else this.playerDetail = {};
    },
    returnPlayerAge(date) {
      return moment(new Date()).diff(new Date(date), "year");
    },
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  img {
    position: fixed;
    left: 0;
    top: 10vh;

    @media only screen and (min-width: 600px) {
      top: 10vh;
    }
    @media only screen and (min-width: 800px) {
      top: 10vh;
    }
  }
}

.player-profile-computer {
  .profile {
    text-shadow: 0 2px 3px #000;

    .player-name {
      font-size: 4em;
      line-height: 1em;
      color: #fff;
    }

    .detail-player {
      color: #fff;
      font-size: 4em;
      line-height: 1em;

      small {
        font-size: 50%;
      }

      h4 {
        color: #fff;
        font-size: 80%;
        line-height: 0.5;
      }
    }
  }

  position: fixed;
  left: 0;
  top: 10vh;

  @media only screen and (min-width: 600px) {
    top: 10vh;
  }
  @media only screen and (min-width: 800px) {
    top: 20vh;
  }
}

.player-profile-mobile {
  .profile {
    .player-name {
      font-size: 2em;
      line-height: 1em;
    }
  }
}

.empty-box {
  height: 25vh;

  @media only screen and (min-width: 600px) {
    height: 40vh;
  }
}
</style>
