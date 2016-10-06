var Games = Vue.extend({
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-2">
         <genre-menu></genre-menu> 
        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-8">
              <game-index></game-index>
            </div>
            <div class="col-md-4">
              <new-game-form></new-game-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function(){
    return { games: [] }
  },
  ready: function () {
    this.fetchGames();
  },
  methods: {
    fetchGames: function () {
      this.$http.get( config.apiURL + 'games').then(function(response){

            this.$set('games', response.data );
            this.$broadcast('gamesFetched', response.data);

          }, function(error){
              console.log(error);
          }
        );
    }
  },
  events: {
    gameAdded: function(){
      this.fetchGames();
    }
  }
});

Vue.component('games', Games);