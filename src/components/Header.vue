<template>
  <nav>
    <ul class="pagination justify-content-center" :style="{marginBottom: 0}">
      <li class="page-item active" :class="{ hidden: !prev, disabled: prevDisabled }">
        <router-link :to="`/${prev}`" class="page-link">
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>
      <li class="mx-2"><h2>{{title}}</h2></li>
      <li class="page-item active" :class="{ hidden: !next, disabled: disabled }">
        <router-link v-if="!disabled" :to="`/${next}`" class="page-link">
          <span aria-hidden="true">&raquo;</span>
        </router-link>
        <a class="page-link" v-else>
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: 'Header',
  props: {
    title: String,
    prev: String,
    next: String,
    disabled: Boolean,
    prevDisabled: Boolean, // remove when all state is saved
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hidden {
  visibility: hidden;
}
</style>
