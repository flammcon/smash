import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';

import Home from './components/views/Home.vue';
import PlayerSelector from './components/views/PlayerSelector.vue';
import DraftOrder from './components/views/DraftOrder.vue';
import Draft from './components/views/Draft.vue';
import Event from './components/views/Event.vue';
import FourVsFour from './components/views/4v4.vue';
import TwoVsTwo from './components/views/2v2.vue';
import Pods from './components/views/Pods.vue';
import SoloBracket from './components/views/SoloBracket.vue';
import SpecialEvent from './components/views/SpecialEvent.vue';
import Exhibition from './components/views/Exhibition.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/players', component: PlayerSelector },
  { path: '/draft_order', component: DraftOrder },
  { path: '/draft', component: Draft },
  {
    path: '/event',
    component: Event,
    children: [
      { path: '/draft_order', component: DraftOrder },
      { path: '/draft', component: Draft },
      { path: '/4v4', component: FourVsFour },
      { path: '/2v2', component: TwoVsTwo },
      { path: '/pods', component: Pods },
      { path: '/1v1', component: SoloBracket },
      { path: '*', component: Draft },
    ],
  },
  {
    path: '/special',
    component: SpecialEvent,
    children: [
      { path: 'draft', component: Draft },
      { path: 'exhibition', component: Exhibition },
    ],
  },
  { path: '*', component: Home },
];

const router = new VueRouter({
  mode: 'history',
  base: '/smash/',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path.includes('event') && store.state.players.length === 0) {
    next('/');
  } else {
    next();
  }
});

export default router;
