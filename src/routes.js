import Vue from 'vue'
import VueRouter from 'vue-router'

import DraftOrder from './components/DraftOrder'
import Draft from './components/Draft'
import FourVsFour from './components/4v4'
import TwoVsTwo from './components/2v2'
import Pods from './components/Pods'
import SoloBracket from './components/SoloBracket'

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
  routes
})

export default router;

