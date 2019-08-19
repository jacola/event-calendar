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

    <v-ons-list>
      <v-ons-list-item>
        <div class="center">
          <label class="center" for="event_start">Starts</label>
        </div>
        <div class="right">
          <v-ons-input input-id="event_start" type="text" v-model="event.start" placeholder="YYYY-MM-DD"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          <label class="center" for="event_start">Ends</label>
        </div>
        <div class="right">
          <v-ons-input input-id="event_start" type="text" v-model="event.end" placeholder="YYYY-MM-DD"></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <br>

    <v-ons-list>
      <v-ons-list-item>
        <label class="left" for="start-input">Calendar</label>
        <div class="right">
          <v-ons-input input-id="start-input" type="text" v-model="event.cssClass"></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <br>

    <v-ons-list>
      <v-ons-list-item>
        <textarea class="textarea textarea--transparent" rows="5" placeholder="Notes" v-model="event.data.description"></textarea>
      </v-ons-list-item>
    </v-ons-list>

  </v-ons-page>
</template>

<script>
import format from 'date-fns/format';
import isDate from 'date-fns/is_date';
import { CREATE_EVENT_MUTATION, ALL_EVENTS_QUERY } from '../constants/graphql';

//import DatePicker from 'vuejs-datepicker';
//import ColorPicker from './ColorPicker';

export default {
  name: 'NewEvent',
  data() {
    return {
      event: {
        title: '',
        start: '',
        end: '',
        cssClass: 'red',
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

      //if (!isDate(start)) start = format(new Date(), 'YYYY-MM-DD');
      //if (!isDate(end))   end = start;
      
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
    }
  }
}
</script>

<style>
.links {
  margin: 20px;
}
.links li {
  margin: 10px 0;
}

.right-text {
  text-align: right !important;
}
</style>
