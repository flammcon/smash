import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'

import DraftOrder from './components/views/DraftOrder'
import Draft from './components/views/Draft'
import FourVsFour from './components/views/4v4'
import TwoVsTwo from './components/views/2v2'
import Pods from './components/views/Pods'
import SoloBracket from './components/views/SoloBracket'

Vue.use(VueRouter);

const routes = [
  { path: '/draft', component: Draft },
  { path: '/4v4', component: FourVsFour },
  { path: '/2v2', component: TwoVsTwo },
  { path: '/pods', component: Pods },
  { path: '/1v1', component: SoloBracket },
  { path: '*', component: DraftOrder },
]

const router = new VueRouter({
  mode: 'history',
  base: '/smash/',
  routes
})

router.beforeEach((to, from, next) => {
  to.path !== '/' && store.state.players.length === 0 
    ? next('/') 
    : next();
})

export default router;

