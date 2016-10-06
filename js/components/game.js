var Game = Vue.extend({
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-2">
         <genre-menu></genre-menu> 
        </div>
        <div class="col-md-10">
          <h1>{{ game.title }}</h1>
          <p>{{ game.description }}</p>
        </div>
      </div>
    </div>
  `,
  data: function(){
    return { game: {} }
  },
  ready: function () {
    this.fetchGame();
  },
  methods: {
    fetchGame: function () {

      var gameSlug = this.$route.params.gameSlug;

      this.$http.get( config.apiURL + 'games/' + gameSlug ).then(function(response){

            this.$set('game', response.data );
            this.$broadcast('gameFetched', response.data);

            console.log( response.data );

          }, function(error){
              console.log(error);
          }
        );
    }
  }
});

Vue.component('game', Game);