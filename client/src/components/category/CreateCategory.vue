<template>
  <div class="container">
    <h1>Create Category</h1>
    <form v-on:submit.prevent=addItem>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Item Name:</label>
            <input type="text" class="form-control" v-model="name" required>
          </div>
        </div>
        </div>
        <br />
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
    </form>
  </div>
</template>
<script>
export default {
  data(){
      return{
        name:'',
        errors: [],
      }
  },
  methods: {
    addItem(){
      if (!this.name) {
      } else{
        let data = {
          type: 'category',
          form: {name: this.name},
        }
        this.$store.dispatch('addNewData', data)
        .then(response => {
            this.$router.push({name: 'Category'})
        })
        .catch(err => console.log(err))
        }
      }
      
  }
}
</script>