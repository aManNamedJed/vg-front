var config = {

	apiURL: 'http://localhost:8000/'
	
}
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
var NewGameForm = Vue.extend({
  template: `
    <form id="form-new-game">

      <div class="dropzone-previews"></div>

      <div class="form-group">
        <input type="text"
               class="form-control"
               id="game-title"
               name="title"
               placeholder="Game Title">
      </div>
      <div class="form-group">
        <textarea name="description" 
                  id="game-description" 
                  cols="30" rows="10" 
                  class="form-control"
                  placeholder="Game Description"></textarea>
      </div>

      <div class="dropzone-previews"></div>
      <div id="new-game-dropzone" style="width: 100%; height: 60px; background-color: #EEE;">Drop Cover Image Here</div>

      <button v-on:click.stop.prevent="saveGame()" 
              class="btn btn-info"
              id="new-game-submit">
              Add New Game
      </button>

    </form>
  `,
  props: [ 'games' ],
  methods: {

    saveGame: function() {

      var formData = new FormData();
      var dz = Dropzone.forElement('#new-game-dropzone');

      formData.append( 'title', document.querySelector('#game-title').value );
      formData.append( 'description', document.querySelector('#game-title').value );
      formData.append( 'coverImage', dz.files[0] );

      console.log(dz.files);

      this.$http.post( config.apiURL + 'games', formData ).then(function(response){

          this.$set('games', response.data );
          $('#form-new-game')[0].reset();

          this.$dispatch('gameAdded');

          alert('fired save game');

        }, function(error){

          console.log(error.body);

        }
      );
    },
    dropzoneInit: function(){

      new Dropzone('#new-game-dropzone', {

        url: config.apiURL + 'images',
        paramName: 'coverImage',
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 100,
        maxFiles: 100,

        // The setting up of the dropzone
        init: function() {
          var myDropzone = this;

          document.querySelector("#new-game-submit").addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            myDropzone.processQueue();
            alert('fired save image');
          });

          this.on("sendingmultiple", function() {
            // Gets triggered when the form is actually being sent.
            // Hide the success button or the complete form.
          });
          this.on("successmultiple", function(files, response) {
            // Gets triggered when the files have successfully been sent.
            // Redirect user or notify of success.
          });
          this.on("errormultiple", function(files, response) {
            // Gets triggered when there was an error sending the files.
            // Maybe show form again, and notify user of error
          });

        }


      });
    }
  },
  ready: function(){
    this.dropzoneInit();
  }
});

Vue.component('new-game-form', NewGameForm);
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
var Genres = Vue.extend({
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div v-for="genre in genres">
            <h3>
              {{ genre.name }}
            </h3>
            <p>
              {{ genre.description }}
            </p>
            <a href="#!/genres/{{ genre.slug }}">View Genre</a>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function(){
    return { genres: [] }
  },
  ready: function () {
    this.fetchGenres()
  },
  methods: {
    fetchGenres: function () {
      this.$http.get( config.apiURL + 'genres').then(function(response){

            this.$set('genres', response.data );
            this.$broadcast('genresFetched', response.data);

          }, function(error){
              console.log(error);
          }
        );
    }
  },
  events: {
    genreAdded: function(){
      this.fetchGenres();
    }
  }
});

Vue.component('genres', Genres);
var GenreMenu = Vue.extend({

  template: `
    <ul class="nav nav-pills nav-stacked">
      <li v-for="genre in genres">
        <a href="#!/genres/{{ genre.slug }}">
          {{ genre.name }}
        </a>  
      </li>
    <ul>
  `,
  data: function(){
    return { genres: [] }
  },
  ready: function () {
    this.fetchGenres()
  },
  methods: {
    fetchGenres: function () {
      this.$http.get( config.apiURL + 'genres').then(function(response){

            this.$set('genres', response.data );
            this.$broadcast('genresFetched', response.data);

          }, function(error){
              console.log(error);
          }
        );
    }
  },
  events: {
    genreAdded: function(){
      this.fetchGenres();
    }
  },
  events: {
    genresFetched: function(genresData){
      this.$set('genres', genresData);
    }
  }
})
// register
Vue.component('genre-menu', GenreMenu);