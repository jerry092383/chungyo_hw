import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/backEnd',
    name: 'backEnd',
    // meta: { requiresAuth: true },
    component: () => import('../views/backEnd/BackEnd.vue'),
    children: [
      {
        path: '',
        name: 'newsManage',
        component: () => import('../views/backEnd/NewsManage.vue')
      },
      {
        path: 'moviesManage',
        name: 'moviesManage',
        component: () => import('../views/backEnd/movies/pages/MoviesManage.vue'),
        children: [
          {
            path: '',
            name: 'all',
            component: () => import('../views/backEnd/movies/pages/All.vue')
          },
          {
            path: 'released',
            name: 'released',
            component: () => import('../views/backEnd/movies/pages/Released.vue')
          },
          {
            path: 'comingSoon',
            name: 'comingSoon',
            component: () => import('../views/backEnd/movies/pages/ComingSoon.vue')
          }
        ]
      },
      {
        path: 'mealsManage',
        name: 'mealsManage',
        component: () => import('../views/backEnd/MealsManage.vue')
      },
      {
        path: 'discountManage',
        name: 'discountManage',
        component: () => import('../views/backEnd/DiscountManage.vue')
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('../views/backEnd/report/pages/Report.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
