<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 text-left">
                <h1>Book</h1>
            </div>
            <div class="col-md-4 text-right">
                <router-link :to="{ name: 'CreateBook' }" class="btn btn-primary">Create Book</router-link>
            </div>
        </div>
        <form v-on:submit.prevent=search>
            <div class="row">
                    <div class="col-md-4">
                        <input type="text" class="form-control" v-model="serachItem.title" placeholder="Title">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" v-model="serachItem.author" placeholder="Author">
                    </div>
                    <div class="col-md-2">
                        <div class="row">
                            <div class="col-md-12">
                            <select class="col-md-12 form-control" v-model="serachItem.category">
                                <option disabled value=''>Category</option>
                                <option v-for="singleCategory in categories" :value="singleCategory.name">{{singleCategory.name}}</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
            </div>
        </form>
        <table class="table table-hover table-bordered">
            <thead class="thead-dark">
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" v-if="item.category != null">
                    <td>{{ item._id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.user.username }}</td>
                    <td>{{ item.category.name }}</td>
                    <td v-if="item.status">Public</td>
                    <td v-if="!item.status">Private</td>
                    <td><router-link :to="{name: 'EditBook', params: { id: item._id }}" class="btn btn-primary"><span class="glyphicon glyphicon-edit">Edit</span></router-link> | <button class="btn btn-danger" v-on:click="deleteItem(item._id, index)"><span class="glyphicon glyphicon-trash">Delete</span></button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                items: [],
                categories: [],
                serachItem:{
                    title: '',
                    author: '',
                    category: ''
                },
                searchText: ''
            }
        },

        created: function()
        {
            this.fetchItems();
            this.fetchItemsCategory();
        },

        methods: {
            fetchItems() {
                this.$store.dispatch('getAllData', 'book')
                .then(response => {
                    console.log(response);
                    this.items = response.data.books
                })
                .catch(err => console.log(err))
            },
            deleteItem(id, index)
            {
                this.$store.dispatch('deleteBook', id)
                .then(response => {
                    this.items.splice(index, 1);
                })
                .catch(err => console.log(err))
            },
            fetchItemsCategory() {
                this.$store.dispatch('getAllData', 'category')
                .then(response => {
                    this.categories = response.data.categorys
                })
                .catch(err => console.log(err))
            },
            search(){
                let data = {
                    searchData: this.serachItem,
                }
                this.$store.dispatch('searchBook', data)
                .then(response => {
                    console.log('response', response);
                    this.items = response.data.books
                })
                .catch(err => console.log(err))
            }
        }
    }
</script>