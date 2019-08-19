<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">Event Details</div>
      <div class="right">
        <v-ons-toolbar-button>Edit</v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <br>
    <div class="links">
    id: {{ $route.params.id }}
    </div>

    <v-ons-action-sheet
      :visible.sync="confirmDelete"
      cancelable >
      <v-ons-action-sheet-button modifier="destructive" @click="deleteEvent">Delete</v-ons-action-sheet-button>
      <v-ons-action-sheet-button @click="confirmDelete=false">Cancel</v-ons-action-sheet-button>
    </v-ons-action-sheet>


    <v-ons-bottom-toolbar>
      <v-ons-button modifier="quiet" @click="confirmDelete=true">Delete Event</v-ons-button>
    </v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import { DELETE_EVENT_MUTATION, ALL_EVENTS_QUERY } from '../constants/graphql';

export default {
  name: 'EventDetails',
  //props: ['id']
  data() {
    return {
      confirmDelete: false
    }
  },
  methods: {
    deleteEvent() {
      const id = this.$route.params.id;

      this.$apollo.mutate({
        mutation: DELETE_EVENT_MUTATION,
        variables: {
          id
        },
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
    //console.log(this.$route);
  }
}
</script>

<style></style>
