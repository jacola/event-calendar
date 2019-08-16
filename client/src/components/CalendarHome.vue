<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Event Calendar</div>
      <div class="right">
        <v-ons-toolbar-button><router-link :to="{name: 'new'}">+</router-link></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <br>
    <div class="links">
      <full-calendar :events="allEvents"/>
    </div>
    <ul>
      <li>
        <router-link :to="{name: 'details'}">
          details
        </router-link>
      </li>
    </ul>
  </v-ons-page>
</template>

<script>
import FullCalendar from 'vue-fullcalendar';

import { ALL_EVENTS_QUERY } from '../constants/graphql'

export default {
  name: 'CalendarHome',
  data() {
    return {
      loading: 0,
      allEvents: []
    }
  },
  methods: {
    newEvent() {
      this.$ons.notification.alert('New Event');
    },
  },
  beforeUpdate() {
  },
  components: {
    FullCalendar
  },
  apollo: {
    allEvents: {
      query: ALL_EVENTS_QUERY
    }
  }
}
</script>

<style></style>
