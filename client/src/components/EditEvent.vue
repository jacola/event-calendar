<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Cancel</v-ons-back-button>
      </div>
      <div class="center">Edit Event</div>
      <div class="right">
        <v-ons-toolbar-button>Done</v-ons-toolbar-button>
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
import { EVENT_QUERY, DELETE_EVENT_MUTATION, ALL_EVENTS_QUERY } from '../constants/graphql';

export default {
  name: 'EditEvent',
  data() {
    return {
      confirmDelete: false,
      event: {
        data: {}
      },
      loading: 0
    }
  },
  methods: {
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
  mounted() {
    // TODO: Add error for when this page in navigated to directly.
    this.event = {
      ...this.$route.params.event
    }
  }
}
</script>

<style></style>
