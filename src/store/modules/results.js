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
    games: [
      {
        id: 1,
        teams: [
          { name: 'TBD', seed: 1, wins: 0 },
          { name: 'TBD', seed: 8, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: true,
      },
      {
        id: 2,
        teams: [
          { name: 'TBD', seed: 3, wins: 0 },
          { name: 'TBD', seed: 4, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 3,
        teams: [
          { name: 'TBD', seed: 3, wins: 0 },
          { name: 'TBD', seed: 6, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 4,
        teams: [
          { name: 'TBD', seed: 2, wins: 0 },
          { name: 'TBD', seed: 7, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 5,
        teams: [
          { name: 'Loser Game 1', seed: 0, wins: 0 },
          { name: 'Loser Game 2', seed: 0, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 6,
        teams: [
          { name: 'Loser Game 3', seed: 0, wins: 0 },
          { name: 'Loser Game 4', seed: 0, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 7,
        teams: [
          { name: 'Winner Game 1', seed: 0, wins: 0 },
          { name: 'Winner Game 2', seed: 0, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 8,
        teams: [
          { name: 'Winner Game 3', seed: 0, wins: 0 },
          { name: 'Winner Game 4', seed: 0, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 9,
        teams: [
          { name: 'Loser Game 5', seed: 0, wins: 0 },
          { name: 'Loser Game 6', seed: 0, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 10,
        teams: [
          { name: 'Winner Game 5', seed: 0, wins: 0 },
          { name: 'Winner Game 6', seed: 0, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 11,
        teams: [
          { name: 'Loser Game 7', seed: 0, wins: 0 },
          { name: 'Loser Game 8', seed: 0, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
      {
        id: 12,
        teams: [
          { name: 'Winner Game 7', seed: 0, wins: 0 },
          { name: 'Winner Game 8', seed: 0, wins: 0 },
        ],
        winner: {},
        loser: {},
        completed: false,
        current: false,
      },
    ],
  },
};

// getters
const getters = {
  redWins: (state) => state.four_vs_four.red_wins,
  blueWins: (state) => state.four_vs_four.blue_wins,
  bloodbath_locked: (state) => state.bloodbath.length > 0,
  four_vs_four_locked: (state, getters, rootState) => (rootState.online
    ? (getters.redWins + getters.blueWins === 6)
    : (getters.redWins === 3 || getters.blueWins === 3)),
  two_vs_two_seeding_locked: (state) => state.two_vs_two.seeding.length > 0,
  two_vs_two_locked: (state) => state.two_vs_two.final.length > 0,
  one_vs_one_seeding_locked: (state) => state.one_vs_one.seeding.length > 0,
  one_vs_one_locked: (state) => state.one_vs_one.length > 0,
  gameById: (state) => (id) => state.one_vs_one.games.find((x) => x.id === id),
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
  update1v1Round1Games({ state, commit }) {
    // Game 1: 1 vs 8
    const game1 = [
      { ...state.one_vs_one.seeding[0], wins: 0, seed: 1 },
      { ...state.one_vs_one.seeding[7], wins: 0, seed: 8 },
    ];

    commit('update1v1GameTeams', { id: 1, teams: game1 });

    // Game 2: 4 vs 5
    const game2 = [
      { ...state.one_vs_one.seeding[3], wins: 0, seed: 4 },
      { ...state.one_vs_one.seeding[4], wins: 0, seed: 5 },
    ];

    commit('update1v1GameTeams', { id: 2, teams: game2 });

    // Game 3: 3 vs 6
    const game3 = [
      { ...state.one_vs_one.seeding[2], wins: 0, seed: 3 },
      { ...state.one_vs_one.seeding[5], wins: 0, seed: 6 },
    ];

    commit('update1v1GameTeams', { id: 3, teams: game3 });

    // Game 4: 2 vs 7
    const game4 = [
      { ...state.one_vs_one.seeding[1], wins: 0, seed: 2 },
      { ...state.one_vs_one.seeding[6], wins: 0, seed: 7 },
    ];

    commit('update1v1GameTeams', { id: 4, teams: game4 });
  },
};

// mutations
const mutations = {
  incrementRedWins(state) {
    state.four_vs_four.red_wins += 1;
  },
  incrementBlueWins(state) {
    state.four_vs_four.blue_wins += 1;
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
  update1v1GameTeams(state, { id, teams }) {
    const game = state.one_vs_one.games.find((x) => x.id === id);
    game.teams = teams;
  },
  update1v1GameResults(state, { id, winner, loser }) {
    const game = state.one_vs_one.games.find((x) => x.id === id);
    game.winner = winner;
    game.loser = loser;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
