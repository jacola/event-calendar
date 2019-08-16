<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button><router-link :to="{name: 'home'}">Cancel</router-link></v-ons-toolbar-button>
      </div>
      <div class="center">New Event</div>
    </v-ons-toolbar>

    <br>
    <div class="links">
      New
    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'TemplatePage'
}
</script>

<style>
.links {
  margin: 20px;
}
.links li {
  margin: 10px 0;
}
</style>
