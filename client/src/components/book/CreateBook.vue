<template>
  <div class="container">
    <h1>Create Book</h1>
    <form v-on:submit.prevent=addItem>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Title:</label>
            <input type="text" class="form-control" v-model="item.title">
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
                <option v-for="singleCategory in categorys" :value="singleCategory._id">{{singleCategory.name}}</option>
            </select>
          </div>
        </div>
        </div>
        <br />
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Add Item</button>
        </div>
    </form>
  </div>
</template>
<script>
export default {
  data(){
      return{
        item:{},
        categorys: this.categorys
      }
  },
  created: function(){
      this.fetchCategorys();
  },
  methods: {
    addItem(){
      let data = {
          type: 'book',
          form: {book: this.item},
        }
      this.$store.dispatch('addNewData', data)
      .then(response => {
          this.$router.push({name: 'Book'})
      })
      .catch(err => console.log(err))
    },
    fetchCategorys(){
      this.$store.dispatch('getAllData', 'category')
      .then(response => {
          this.categorys = response.data.categorys
      })
      .catch(err => console.log(err))
    }
  }
}
</script>