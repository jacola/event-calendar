<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Event Calendar</div>
      <div class="right">
        <span v-if="!loading">
          <v-ons-toolbar-button @click="reloadAllEvents"><v-ons-icon icon="md-refresh" size="25px"></v-ons-icon></v-ons-toolbar-button>
        </span>
        <span v-else>
          <v-ons-toolbar-button disabled><v-ons-icon icon="md-refresh" size="25px"></v-ons-icon></v-ons-toolbar-button>
        </span>
        <v-ons-toolbar-button @click="$router.push({ name: 'newevent' })"><v-ons-icon icon="md-plus" size="25px"></v-ons-icon></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <span v-if="loading">
      <v-ons-progress-bar indeterminate></v-ons-progress-bar>
    </span>

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
      allEvents: [],
    }
  },
  methods: {
    reloadAllEvents() {
      this.$apollo.queries.allEvents.refetch().then(() => {
        this.$ons.notification.toast(`Fetched ${this.allEvents.length} events`, {
          timeout: 1000,
          animation: 'fall'
        });
      });
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
