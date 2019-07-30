<template>
    <div class="container">
        <div class="row">
          <div class="col-md-8 text-left">
            <h1>Category</h1>
          </div>
          <div class="col-md-4 text-right">
            <router-link :to="{ name: 'CreateCategory' }" class="btn btn-primary">Create Category</router-link>
          </div>
        </div>

        <table class="table table-hover table-bordered">
            <thead class="thead-dark">
            <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Default Status</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{ item._id }}</td>
                    <td>{{ item.name }}</td>
                    <td><label class="checkbox-inline"><input type="checkbox" value="true" v-model="item.default" @change="check(item._id)"> Default</label></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                items: []
            }
        },
        created: function()
        {
            this.fetchItems();
        },
        methods: {
            fetchItems() {
                this.$store.dispatch('getAllData', 'category')
                .then(response => {
                    this.items = response.data.categorys
                })
                .catch(err => console.log(err))
            },
            check(itemID){
                for (var i=0; i<this.items.length;i++){
                    if (this.items[i]._id != itemID){
                        this.items[i].default = false;
                    }
                }
                this.$store.dispatch('saveAllCategory', this.items)
                .then(response => {
                    this.items = response.data.categorys
                })
                .catch(err => console.log(err))
            }
        }
    }
</script>