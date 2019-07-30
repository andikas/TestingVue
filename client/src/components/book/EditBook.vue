<template>
  <div class="container">
    <h1>Edit Book</h1>
    <form v-on:submit.prevent=updateItem>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Title:</label>
            <input type="text" class="form-control" v-model="item.title">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label>Author:</label>
            <input type="text" class="form-control" v-model="item.author">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label>Status:</label>
            <div class="row">
            <div class="col-md-6">
            <input type="radio" v-model="item.status" value="true"> Public<br>
            </div>
            <div class="col-md-6">

            <input type="radio" v-model="item.status" value="false"> Private
            </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label>Category:</label>
            <select class="col-md-12 form-control" v-model="item.category">
                <option v-for="singleCategory in categorys" :value="singleCategory._id" :selected="checkSelected(singleCategory._id)">{{singleCategory.name}}</option>
            </select>
          </div>
        </div>
        </div>
        <br />
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Update Book</button>
        </div>
    </form>
  </div>
</template>
<script>
export default{
        data(){
            return{
                item:{},
                categorys: this.categorys
            }
        },

        created: function(){
            this.fetchCategorys();
            this.getItem();
        },

        methods: {
            checkSelected(item){
              if (item == this.item.category){
                return true;
              }else{
                return false;
              }
            },
            getItem()
            {
              this.$store.dispatch('getBookData', this.$route.params.id)
                .then(response => {
                    this.item = response.data.books;
                })
                .catch(err => console.log(err))
            },
            updateItem()
            {
              let data = {
                form: {book: this.item},
              }
              this.$store.dispatch('updateBookData', data)
                .then(response => {
                    this.$router.push({name: 'Book'});
                })
                .catch(err => console.log(err))
              // let uri = 'http://localhost:4000/api/book/update/' + this.$route.params.id;
              //   this.axios.post(uri, this.item).then((response) => {
              //     this.$router.push({name: 'Book'});
              //   });
            },
            fetchCategorys()
            {
              this.$store.dispatch('getAllData', 'category')
                .then(response => {
                    this.categorys = response.data.categorys
                })
                .catch(err => console.log(err))
            },
        }
    }
</script>