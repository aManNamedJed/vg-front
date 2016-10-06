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