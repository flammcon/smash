<template>
  <div
    class="modal fade"
    id="settingsModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="settingModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="settingsModalLabel">Event Settings</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h5>Draft type</h5>
          <div class="btn-group btn-group-toggle">
            <label :class="getToggleClass(draft, 'normal')">
              <input type="radio" value="normal" id="normal" v-model="draft"> Normal
            </label>
          </div>
          <h5 class="mt-2">Event format</h5>
          <div class="btn-group btn-group-toggle">
            <label :class="getToggleClass(format, 'local')">
              <input type="radio" value="local" id="local" v-model="format"> Local
            </label>
            <label :class="getToggleClass(format, 'online')">
              <input type="radio" value="online" id="online" v-model="format"> Online
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="navigate">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'EventSettings',
  components: {
  },
  data() {
    return {
      draft: 'normal',
      format: 'local',
    };
  },
  computed: {
  },
  methods: {
    ...mapMutations(['setEventRules']),
    getToggleClass(toggle, value) {
      return ['btn btn-secondary', { active: toggle === value }];
    },
    navigate() {
      const draft = this.draft !== 'normal';
      const online = this.format === 'online';

      this.setEventRules({ draft, online });
      this.$router.push('players');
    },
  },
};
</script>

<style>
</style>
