<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="$router.go(-1)">Cancel</v-ons-toolbar-button>
      </div>
      <div class="center">New Event</div>
      <div class="right">
        <v-ons-toolbar-button v-if="event.title===''" disabled>Add</v-ons-toolbar-button>
        <v-ons-toolbar-button v-else @click="handleSubmit" >Add</v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

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

  </v-ons-page>
</template>

<script>
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';
import { CREATE_EVENT_MUTATION, ALL_EVENTS_QUERY } from '../constants/graphql';

import ColorPicker from './ColorPicker';
import DatePickerDialog from './DatePickerDialog';

export default {
  name: 'NewEvent',
  data() {
    return {
      showColorPicker: false,
      event: {
        title: '',
        start: format(new Date(), 'YYYY-MM-DD'),
        end: format(new Date(), 'YYYY-MM-DD'),
        cssClass: '',
        data: {
          description: ''
        }
      }
    }
  },
  methods: {
    async handleSubmit() {
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
      }

      this.$apollo.mutate({
        mutation: CREATE_EVENT_MUTATION,
        variables: {
          ...event
        },
        update: (store, { data: { createEvent } } ) => {
          const data = store.readQuery({ query: ALL_EVENTS_QUERY });
          data.allEvents.push(createEvent);
          store.writeQuery({ query: ALL_EVENTS_QUERY, data });
        }
      }).catch((error) => {
        this.$ons.notification.alert(error);
      });

      this.resetValues();
      this.$router.push('/');
    },
    selectColor(color) {
      this.event = {
        ...this.event,
        cssClass: color
      }
    },
    resetValues() {
      this.event = {
        title: '',
        start: '',
        end: '',
        cssClass: '',
        data: {
          description: ''
        }
      }
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
  components: {
    ColorPicker,
    DatePickerDialog
  }
}
</script>

<style>
.color-picker .dialog-container {
  height: 120px;
}
</style>
