import delay from './delay';
import characters from '../data/characters';
import draft from '../data/draft';

export default {
  getCharacters(cb) {
    const chars = characters.map(value => {
      const assetUrl = {url: this.getAssetUrl(value.id)};
      return {
        ...value, 
        ...assetUrl
      }
    });
    setTimeout(() => cb(chars), delay);
  },

  getPlayers(cb) {
    const players = draft.map(value => {
      return {
        name: value.player,
        id: value.pick,
        character: this.getAssetUrl(0),
        results: {
          bloodbath: 0,
          fourVsFour: 0,
          twoVsTwoSeeding: 0,
          twoVsTwo: 0,
          oneVsOne: 0,
          podScore: 0,
          totalAdj: 0
        },
        disabled: value.disabled
      };
    });
    setTimeout(() => cb(players), delay);
  },

  getAssetUrl(id) {
    const character = characters.find(x => x.id == id);
    const url = id === 0 ? `Unknown` : `${id}-${character.name.replace(/[.]/g, "")}`;
    return require(`../assets/characters/${url}.png`);
  },

  getCharacter(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, characters.find(a => a.id == id)));
      }, delay);
    });
  },

  getDraftOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], draft));
      }, delay);
    });
  }
}