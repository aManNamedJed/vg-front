var GameIndex = Vue.extend({

  template: `
    <input v-model="searchTitle"
           type="text"
           class="form-control"
           placeholder="Search Games">
    <hr>
      <span v-for="game in games | filterBy searchTitle in 'title'" v-cloak>
          <img v-bind:src="game.images[0].url" style="max-width: 200px; display: inline"/>
      </span>
  `,
  props: ['games'],
  events: {
    gamesFetched: function(gamesData){
      this.$set('games', gamesData);
      console.log( gamesData );
    }
  }

})
// register
Vue.component('game-index', GameIndex);