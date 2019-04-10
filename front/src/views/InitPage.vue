<template>
  <form submit.prevent="login()">
    <div class="Formulaire">
      <div class>
        <md-field>
          <label for="movie">Nb Player</label>
          <md-select v-model="nbPlayer" name="movie" id="movie" @md-selected="onNbPlayerChange">
            <md-option value="2">2</md-option>
            <md-option value="3">3</md-option>
            <md-option value="4">4</md-option>
            <md-option value="5">5</md-option>
            <md-option value="6">6</md-option>
          </md-select>
        </md-field>
      </div>

      <md-field v-for="player in players" :key="player.id">
        <label>Player {{player.id+1}}</label>
        <md-input type="text" min="2" max="6"/>
      </md-field>

    </div>
    <md-button class="md-raised md-primary" type="submit">Submit</md-button>

    <hr>
  </form>
</template>
<script>
export default {
  name: "init-page",
  data() {
    return {
      nbPlayer: 1,
      players: []
    };
  },
  methods: {
    onNbPlayerChange() {
      console.log("nbPlayer", this.nbPlayer);
      this.players = [];
      for (let i = 0; i < this.nbPlayer; i++) {
        this.players.push({
          id: i,
          name: ""
        });
      }
    }
  }
};
</script>