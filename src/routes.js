import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';

import DraftOrder from './components/views/DraftOrder.vue';
import Draft from './components/views/Draft.vue';
import FourVsFour from './components/views/4v4.vue';
import TwoVsTwo from './components/views/2v2.vue';
import Pods from './components/views/Pods.vue';
import SoloBracket from './components/views/SoloBracket.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/draft', component: Draft },
  { path: '/4v4', component: FourVsFour },
  { path: '/2v2', component: TwoVsTwo },
  { path: '/pods', component: Pods },
  { path: '/1v1', component: SoloBracket },
  { path: '*', component: DraftOrder },
];

const router = new VueRouter({
  mode: 'history',
  base: '/smash/',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && store.state.players.length === 0) {
    next('/');
  } else {
    next();
  }
});

export default router;
