<template>
  <div>
    <Header title="Draft Order" next="draft" :disabled="!locked"/>
    <SortablePlayerList :players="draft_order" name="draft-order" :disabled="locked"/>
    <button v-if="!locked" type="button" class="btn btn-primary mt-2" @click="lockDraftOrder()">Lock</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '../Header.vue';
import SortablePlayerList from '../SortablePlayerList.vue';

export default {
  name: 'DraftOrder',
  components: {
    Header,
    SortablePlayerList,
  },
  methods: {
    ...mapActions(['setPlayerDraftOrder']),
    lockDraftOrder() {
      this.setPlayerDraftOrder(this.draft_order);
      if (this.ruleset === 'sam') {
        this.$router.push('special/draft');
      } else {
        this.$router.push('event/draft');
      }
    },
  },
  computed: {
    ...mapState({
      draft_order: (state) => state.draft_order,
      locked: (state) => state.draft_order_locked,
      ruleset: (state) => state.ruleset,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.players { width: 200px; }
</style>
