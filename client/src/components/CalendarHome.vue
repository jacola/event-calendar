<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Event Calendar</div>
      <div class="right">
        <v-ons-toolbar-button @click="$router.push({ name: 'newevent' })"><ons-icon icon="md-plus" size="25px"></ons-icon></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <span v-if="loading">
      <v-ons-progress-bar indeterminate></v-ons-progress-bar>
    </span>

    <span v-else>
      <br>
      <div class="links">
        <full-calendar :events="allEvents" @eventClick="eventSelect" />
      </div>
    </span>
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

<style>
  .red {
    background: rgb(235, 77, 77) !important;
    color: whitesmoke !important;
  }
  .blue {
    background: rgb(59, 59, 163) !important;
    color: whitesmoke !important;
  }
  .orange {
    background: orange !important;
    color: white !important;
  }
  .green {
    background: rgb(49, 155, 49) !important;
    color: white !important;
  }
  .blue,
  .orange,
  .red,
  .green {
    font-size: 13px;
    font-weight: 500;
    text-transform: capitalize;
  }
  .event-item {
    padding: 2px 0 2px 4px !important;
  }
</style>
