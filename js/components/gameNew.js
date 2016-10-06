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
      <div class="form-group">
        <input type="file"
               class="form-control"
               id="game-cover-image"
               name="coverImage"
               placeholder="Game Title">
      </div>
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

      formData.append( 'title', document.querySelector('#game-title').value );
      formData.append( 'description', document.querySelector('#game-title').value );
      formData.append( 'coverImage', document.querySelector('#game-cover-image').files[0] );

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
    }
  },
  ready: function(){
    this.dropzoneInit();
  }
});

Vue.component('new-game-form', NewGameForm);