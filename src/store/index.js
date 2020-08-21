import Vue from 'vue';
import Vuex from 'vuex';
import results from './modules/results';
import smash from '../api/smash';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    results,
  },
  state: {
    players: [],
    draft_order: [],
    draft: [],
    gameOver: false,
    draft_order_locked: false,
    special_draft: false,
    online: false,
  },
  mutations: {
    setPlayers(state, players) {
      state.players = players;
      state.draft_order = players.map((player) => ({
        name: player.name,
        id: player.id,
      }));
    },
    setEventRules(state, payload) {
      state.special_draft = payload.draft;
      state.online = payload.online;
    },
    lockDraftOrder(state) {
      state.draft_order_locked = true;
    },
    setDraftPicks(state, draftPicks) {
      state.draft = draftPicks;
    },
    setPlayerDraftPick(state, payload) {
      const player = state.players.find((x) => x.id === payload.id);
      player.pick = payload.draftPick;
    },
    addPlayerCharacter(state, payload) {
      const player = state.players.find((x) => x.id === payload.id);
      player.picks.splice(payload.index, 1, payload.pick);
    },
    updatePlayerCharacter(state, payload) {
      const player = state.players.find((x) => x.id === payload.id);
      player.character = payload.character;
      player.drafted = true;
    },
    update2v2Scores(state, payload) {
      payload.forEach((team, index) => {
        let points = 0;
        if (index === 0) {
          points = 4;
        } else if (index === 1) {
          points = 2;
        } else if (index === 2) {
          points = 1;
        }

        const player1 = state.players.find((x) => x.id === team.player1.id);
        player1.results.twoVsTwo = points;

        const player2 = state.players.find((x) => x.id === team.player2.id);
        player2.results.twoVsTwo = points;
      });
    },
    update1v1Scores(state, payload) {
      payload.forEach((player, index) => {
        let points = index;
        if (index === 7) {
          points = 8;
        }

        const team = state.players.find((x) => x.id === player.id);
        team.results.oneVsOne = points;
      });
      state.gameOver = true;
    },
    update4v4Scores(state, winners) {
      winners.forEach((winner) => {
        const player = state.players.find((x) => x.id === winner.id);
        player.results.fourVsFour = 2;
      });
    },
    updatePodScores(state, payload) {
      payload.forEach((player, index) => {
        let points = index;
        if (index === 7) {
          points = 8;
        }

        const team = state.players.find((x) => x.id === player.id);
        team.results.pods = points;
      });
    },
    updatePlayerPodScore(state, payload) {
      const player = state.players.find((x) => x.id === payload.id);
      player.results.podScore += payload.score;
    },
  },
  actions: {
    loadPlayers({ commit }, payload) {
      smash.getPlayersFromIds(payload, (players) => {
        commit('setPlayers', players);
      });
    },
    setPlayerDraftOrder({ commit }, payload) {
      payload.forEach((value, index) => {
        commit('setPlayerDraftPick', { id: value.id, draftPick: index + 1 });
      });
      commit('lockDraftOrder');
    },
    updatePlayerPodScore({ commit }, payload) {
      commit('updatePlayerPodScore', payload);
    },
  },
  getters: {
    playerById: (state) => (id) => state.players.find((player) => player.id === id),
    characterById: () => (id) => smash.getAssetUrl(id),
    sortedPlayerList: (state) => [...state.players].sort((a, b) => a.pick - b.pick),
    playersByTotalScore: (state) => [...state.players].sort((a, b) => {
      const totalA = a.results.pods + a.results.fourVsFour + a.results.twoVsTwo
        + a.results.oneVsOne + a.results.totalAdj;
      const totalB = b.results.pods + b.results.fourVsFour + b.results.twoVsTwo
        + b.results.oneVsOne + b.results.totalAdj;

      return totalA - totalB;
    }),
    disabledCharactersByPlayerId: (state) => (id) => {
      const player = state.players.find((x) => x.id === id);
      return player.disabled;
    },
    draftCompleted: (state) => state.draft.length > 0,
    draftPicks: (state) => state.draft,
  },
});

export default store;
