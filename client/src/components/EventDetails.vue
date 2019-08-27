<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">Event Details</div>
      <div class="right">
        <v-ons-toolbar-button @click="editEvent">Edit</v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <span v-if="loading">
      <v-ons-progress-bar indeterminate></v-ons-progress-bar>
    </span>

    <span v-else>
      <v-ons-list>
        <v-ons-list-item modifier="nodivider">
          <div class="center">
            <b>{{ event.title }}</b>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="center">
            <span class="list-item__subtitle"> {{ event.start }} to {{ event.end }} </span>
          </div>
        </v-ons-list-item>
      </v-ons-list>

      <br>

      <v-ons-list>
        <v-ons-list-item>
          <label class="left" for="start-input">Calendar</label>
          <div class="right">
            <v-ons-input disabled input-id="start-input" type="text" v-model="event.cssClass"></v-ons-input>
          </div>
        </v-ons-list-item>
      </v-ons-list>

      <br>

      <v-ons-list>
        <v-ons-list-header> Description </v-ons-list-header>
        <v-ons-list-item>
          {{ event.data.description }}
        </v-ons-list-item>
      </v-ons-list>

      <p class="center list-item__subtitle">
        Created: {{ event.created | scalarToDateTime }}<br>
        <span v-if="event.modified != event.created">Modified: {{ event.modified | scalarToDateTime }}</span>
      </p>
    </span>

    <v-ons-action-sheet :visible.sync="confirmDelete" cancelable>
      <v-ons-action-sheet-button modifier="destructive" @click="deleteEvent">Delete</v-ons-action-sheet-button>
      <v-ons-action-sheet-button @click="confirmDelete=false">Cancel</v-ons-action-sheet-button>
    </v-ons-action-sheet>

    <v-ons-bottom-toolbar>
      <v-ons-button modifier="quiet" @click="confirmDelete=true">Delete Event</v-ons-button>
    </v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import format from 'date-fns/format';
import { EVENT_QUERY, DELETE_EVENT_MUTATION, ALL_EVENTS_QUERY } from '../constants/graphql';

export default {
  name: 'EventDetails',
  data() {
    return {
      confirmDelete: false,
      event: {
        id: this.$route.params.id,
        title: '',
        start: '',
        end: '',
        cssClass: '',
        data: {}
      },
      loading: 0
    }
  },
  methods: {
    editEvent() {
      const event = this.event;
      this.$router.push({ name: 'editevent', params: { event } });
    },
    deleteEvent() {
      const id = this.$route.params.id;

      this.$apollo.mutate({
        mutation: DELETE_EVENT_MUTATION,
        variables: { id },
        update: (store, {data: { deleteEvent } } ) => {
          const data = store.readQuery({ query: ALL_EVENTS_QUERY });
          data.allEvents = data.allEvents.filter(e => {
            return e.id !== deleteEvent.id;
          });
          store.writeQuery({ query: ALL_EVENTS_QUERY, data });
        }
      }).catch((error) => {
        this.$ons.notification.alert(error);
      });

      this.$router.back();
    }
  },
  filters: {
    scalarToDateTime: (value) => {
      if (!value) return 'n/a';
      return format(new Date(value), 'YYYY-MM-DD hh:mm:ss') ;
    }
  },
  apollo: {
    event: {
      query: EVENT_QUERY,
      loadingKey: 'loading',
      variables() {
        return {
          id: this.event.id
        }
      }
    }
  }
}
</script>

<style></style>
