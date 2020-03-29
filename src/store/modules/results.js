// initial state
const state = {
  bloodbath: [],
  four_vs_four: {
    red_wins: 0,
    blue_wins: 0,
  },
  two_vs_two: {
    seeding: [],
    final: [],
    games: [
      {
        id: 1,
        teams: [
          {
            player1: { name: 'TBD' }, player2: { name: 'TBD' }, wins: 0, seed: '1',
          },
          {
            player1: { name: 'TBD' }, player2: { name: 'TBD' }, wins: 0, seed: '4',
          },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: true,
      },
      {
        id: 2,
        teams: [
          {
            player1: { name: 'TBD' }, player2: { name: 'TBD' }, wins: 0, seed: '2',
          },
          {
            player1: { name: 'TBD' }, player2: { name: 'TBD' }, wins: 0, seed: '3',
          },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 3,
        teams: [
          {
            player1: { name: 'Loser Game 1' }, player2: { name: 'Loser Game 1' }, wins: 0, seed: '',
          },
          {
            player1: { name: 'Loser Game 2' }, player2: { name: 'Loser Game 2' }, wins: 0, seed: '',
          },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 4,
        teams: [
          {
            player1: { name: 'Winner Game 1' }, player2: { name: 'Winner Game 1' }, wins: 0, seed: '',
          },
          {
            player1: { name: 'Winner Game 2' }, player2: { name: 'Winner Game 2' }, wins: 0, seed: '',
          },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
    ],
  },
  one_vs_one: {
    seeding: [],
    final: [],
    games: [],
  },
};

// getters
const getters = {
  get_red_wins: (state) => state.four_vs_four.red_wins,
  get_blue_wins: (state) => state.four_vs_four.blue_wins,
  bloodbath_locked: (state) => state.bloodbath.length > 0,
  four_vs_four_locked: (state, getters) => getters.get_red_wins === 3 || getters.get_blue_wins === 3,
  two_vs_two_seeding_locked: (state) => state.two_vs_two.seeding.length > 0,
  two_vs_two_locked: (state) => state.two_vs_two.final.length > 0,
  one_vs_one_seeding_locked: (state) => state.one_vs_one.seeding.length > 0,
  one_vs_one_locked: (state) => state.one_vs_one.length > 0,
};

// actions
const actions = {
  update2v2Round1Games({ state, commit }) {
    const game1 = [
      state.two_vs_two.seeding[0],
      state.two_vs_two.seeding[3],
    ];

    commit('update2v2GameTeams', { id: 1, teams: game1 });

    const game2 = [
      state.two_vs_two.seeding[1],
      state.two_vs_two.seeding[2],
    ];

    commit('update2v2GameTeams', { id: 2, teams: game2 });
  },
};

// mutations
const mutations = {
  incrementRedWins(state, payload) {
    state.four_vs_four.red_wins = payload;
  },
  incrementBlueWins(state, payload) {
    state.four_vs_four.blue_wins = payload;
  },
  setBloodbathResults(state, payload) {
    state.bloodbath = payload;
  },
  set2v2SeedingResults(state, payload) {
    state.two_vs_two.seeding = payload;
  },
  set2v2Results(state, payload) {
    state.two_vs_two.final = payload;
  },
  set1v1SeedingResults(state, payload) {
    state.one_vs_one.seeding = payload;
  },
  set1v1Results(state, payload) {
    state.one_vs_one.final = payload;
  },
  update2v2GameTeams(state, { id, teams }) {
    const game = state.two_vs_two.games.find((x) => x.id === id);

    game.teams[0].player1 = teams[0].player1;
    game.teams[0].player2 = teams[0].player2;

    game.teams[1].player1 = teams[1].player1;
    game.teams[1].player2 = teams[1].player2;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
