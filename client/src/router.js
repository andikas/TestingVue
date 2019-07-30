import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import CreateCategory from './components/category/CreateCategory.vue';
import Category from './components/category/Category.vue';
import Book from './components/book/Book.vue';
import CreateBook from './components/book/CreateBook.vue';
import EditBook from './components/book/EditBook.vue';
import LoginPage from './components/login/LoginPage.vue';
import RegisterUser from './components/register/RegisterUser.vue';

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { name: 'LoginPage', 
    path: '/login', 
    component: LoginPage 
  },
  { name: 'RegisterUser', 
    path: '/register', 
    component: RegisterUser 
  },
  {
    name: 'CreateCategory',
    path: '/create/category',
    component: CreateCategory,
    meta: { 
      requiresAuth: true
    }
  },
  {
    name: 'Category',
    path: '/category',
    component: Category,
    meta: { 
      requiresAuth: true
    }
  },
  {
    name: 'Book',
    path: '/book',
    component: Book,
    meta: { 
      requiresAuth: true
    }
  },
  {
    name: 'CreateBook',
    path: '/create/book',
    component: CreateBook,
    meta: { 
      requiresAuth: true
    }
  },
  {
    name: 'EditBook',
    path: '/book/:id',
    component: EditBook,
    meta: { 
      requiresAuth: true
    }
  },
  // { path: '*', redirect: '/login' }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router