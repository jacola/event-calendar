<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Cancel</v-ons-back-button>
      </div>
      <div class="center">Edit Event</div>
      <div class="right">
        <v-ons-toolbar-button v-if="event.title===''" disabled>Done</v-ons-toolbar-button>
        <v-ons-toolbar-button v-else @click="handleSubmit">Done</v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <span v-if="loading">
      <v-ons-progress-bar indeterminate></v-ons-progress-bar>
    </span>

    <span v-else>
      <br>

      <v-ons-list>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input style="width:100%" input-id="event_title" placeholder="Title" v-model="event.title"></v-ons-input>
          </div>
        </v-ons-list-item>
      </v-ons-list>

      <br>

      <date-picker-dialog :label="'Starts'" @pickDate="updateStartDate" :selectedDate="event.start"></date-picker-dialog>
      <date-picker-dialog :label="'Ends'" @pickDate="updateEndDate" :selectedDate="event.end"></date-picker-dialog>

      <br>

      <color-picker :color="event.cssClass" @setColor="setColor"></color-picker>

      <br>

      <v-ons-list>
        <v-ons-list-item>
          <textarea style="width:100%" class="textarea textarea--transparent" rows="5" placeholder="Notes" v-model="event.data.description"></textarea>
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
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';

import { UPDATE_EVENT_MUTATION, EVENT_QUERY, DELETE_EVENT_MUTATION, ALL_EVENTS_QUERY } from '../constants/graphql';

import ColorPicker from './ColorPicker';
import DatePickerDialog from './DatePickerDialog';

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
    handleSubmit() {
      let start = format(this.event.start, 'YYYY-MM-DD');
      let end   = format(this.event.end, 'YYYY-MM-DD');

      if (!isValid(new Date(start))) start = format(new Date(), 'YYYY-MM-DD');
      if (!isValid(new Date(end)) || new Date(start) > new Date(end))   end = start;

      const description = this.event.data.description;

      const event = {
        ...this.event,
        start,
        end,
        description
      };

      this.$apollo.mutate({
        mutation: UPDATE_EVENT_MUTATION,
        variables: { ...event },
        update: (store, {data: { updateEvent } } ) => {
          // TODO: Check if there is a better way to handle this.
          const data = store.readQuery({ query: ALL_EVENTS_QUERY });
          const idx = data.allEvents.findIndex(e => e.id === event.id);
          data.allEvents[idx] = updateEvent;
          store.writeQuery({ query: ALL_EVENTS_QUERY, data });

          // Should the EVENT_QUERY be updated too?  
        }
      }).catch((error) => {
        this.$ons.notification.alert(error);
      });

      this.$router.go(-1);
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

      this.$router.go(-2);
    },
    setColor(v) {
      this.event.cssClass = v;
    },
    updateStartDate(d) {
      this.event.start = d;

      let start = format(this.event.start, 'YYYY-MM-DD');
      let end   = format(this.event.end, 'YYYY-MM-DD');

      if (!isValid(new Date(start)))
        this.event.start = format(new Date(), 'YYYY-MM-DD');

      if (!isValid(new Date(end)) || new Date(start) > new Date(end))
        this.event.end = start;
    },
    updateEndDate(d) {
      this.event.end = d;

      let start = format(this.event.start, 'YYYY-MM-DD');
      let end   = format(this.event.end, 'YYYY-MM-DD');

      if (!isValid(new Date(end)))
        this.event.end = format(new Date(), 'YYYY-MM-DD');

      if (new Date(start) > new Date(end))
        this.event.start = end;
    }

  },
  mounted() {
    // TODO: Add error for when this page in navigated to directly.
    this.event = {
      ...this.$route.params.event
    }
  },
  components: {
    ColorPicker,
    DatePickerDialog
  }
}
</script>

<style></style>
