<template>
  <div>
    <Header title="Draft Order" next="draft" :disabled="!locked"/>
    <SortablePlayerList :players="draft_order" name="draft-order" :disabled="locked"/>
    <button type="button" class="btn btn-primary mt-2" @click="lockDraftOrder()" :disabled="locked">Lock</button>
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
    ...mapActions(['setPlayerDraftPicks']),
    lockDraftOrder() {
      this.setPlayerDraftPicks(this.draft_order);
      this.$router.push('draft');
    },
  },
  computed: {
    ...mapState({
      draft_order: (state) => state.draft_order,
      locked: (state) => state.draft_order_locked,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.players { width: 200px; }
</style>
