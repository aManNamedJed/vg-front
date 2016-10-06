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