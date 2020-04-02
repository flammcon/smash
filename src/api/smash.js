import delay from './delay';
import characters from '../data/characters';
import activePlayers from '../data/players';

export default {
  getCharacters(cb) {
    const chars = characters.map((value) => {
      const assetUrl = { url: this.getAssetUrl(value.id) };
      return {
        ...value,
        ...assetUrl,
      };
    });
    setTimeout(() => cb(chars), delay);
  },

  getPlayers(cb) {
    const players = activePlayers.map((player) => ({
      name: player.name,
      id: player.id,
      pick: 0,
      drafted: false,
      mii: this.getMiiUrl(player.id),
      character: this.getAssetUrl(0),
      results: {
        fourVsFour: 0,
        twoVsTwo: 0,
        oneVsOne: 0,
        podScore: 0,
        totalAdj: 0,
      },
      disabled: player.disabled,
    }));
    setTimeout(() => cb(players), delay);
  },

  getAssetUrl(id) {
    const character = characters.find((x) => x.id === id);
    const filename = id === 0 ? 'Unknown' : `${id}-${character.name.replace(/[.]/g, '')}`;
    // eslint-disable-next-line global-require
    return require(`../assets/characters/${filename}.png`);
  },

  getMiiUrl(id) {
    const player = activePlayers.find((x) => x.id === id);
    // eslint-disable-next-line global-require
    return require(`../assets/players/${id}-${player.name}.png`);
  },

  getCharacter(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...characters.find((a) => a.id === id) });
      }, delay);
    });
  },

  getDraftOrder(cb) {
    const players = activePlayers.map((player) => ({
      name: player.name,
      id: player.id,
    }));
    setTimeout(() => cb(players), delay);
  },
};
