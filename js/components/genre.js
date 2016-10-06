var Genre = Vue.extend({
  
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-2">
         <genre-menu></genre-menu> 
        </div>
        <div class="col-md-10">
          <h1>{{ genre.name }}</h1>
          <p>{{ genre.description }}</p>
          <hr>
          <div class="grid">
            <div class="grid-item">
              <div v-for="game in games">
                <img v-bind:src="game.images[0].url" class="img-responsive"/>
                <h3>{{ game.title }}</h3>
                <p>{{ game.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function(){
    return { genre: [], games: [] }
  },
  route: {
    data: function (transition) {
       var genreSlug = transition.to.params.genreSlug;

        this.$http.get( config.apiURL + 'genres/' + genreSlug ).then(function(response){

            this.$set('genre', response.data );
            this.$set('games', response.data.games );
            this.$broadcast('genreFetched', response.data);

            console.log(response.data);

          }, function(error){
              console.log(error);
          }
        );

    }
  }

});

Vue.component('genre', Genre);