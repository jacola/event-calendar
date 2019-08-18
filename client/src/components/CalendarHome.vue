<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Event Calendar</div>
      <div class="right">
        <v-ons-toolbar-button @click="$router.push({ name: 'newevent' })"><ons-icon icon="md-plus" size="25px"></ons-icon></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <br>
    <div class="links">
      <full-calendar :events="allEvents" @eventClick="eventSelect" />
    </div>
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
    eventSelect(event) { //, jsEvent, pos) {
      this.$router.push({ name: 'eventdetails', params: { id: event.id } })
    }
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
