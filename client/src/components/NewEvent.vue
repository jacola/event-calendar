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
        <div class="right">
          <label class="center" for="event_end">Ends</label>
        </div>
        <div class="right">
          <v-ons-input input-id="event_end" type="text" v-model="event.end" placeholder="YYYY-MM-DD"></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <br>

    <v-ons-dialog class="color-picker" :visible.sync="showColorPicker">
      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">Select Color</div>
        </v-ons-toolbar>

        <p style="text-align: center">
          <v-ons-button modifier="quiet" @click="event.cssClass=''; showColorPicker=false;">
            <v-ons-icon icon="md-circle-o" style="color: rgb(200, 200, 200)" size="40px"></v-ons-icon>
          </v-ons-button>
          <v-ons-button modifier="quiet" @click="event.cssClass='red'; showColorPicker=false;">
            <span v-if="event.cssClass==='red'"><v-ons-icon style="color: rgb(235, 77, 77)" icon="md-check-circle" size="40px"></v-ons-icon></span>
            <span v-else><v-ons-icon style="color: rgb(235, 77, 77)" icon="md-circle" size="40px"></v-ons-icon></span>
          </v-ons-button>
          <v-ons-button modifier="quiet" @click="event.cssClass='blue'; showColorPicker=false;">
            <span v-if="event.cssClass==='blue'"><v-ons-icon style="color: rgb(59, 59, 163)" icon="md-check-circle" size="40px"></v-ons-icon></span>
            <span v-else><v-ons-icon style="color: rgb(59, 59, 163)" icon="md-circle" size="40px"></v-ons-icon></span>
          </v-ons-button>
          <v-ons-button modifier="quiet" @click="event.cssClass='orange'; showColorPicker=false;">
            <span v-if="event.cssClass==='orange'"><v-ons-icon style="color: orange" icon="md-check-circle" size="40px"></v-ons-icon></span>
            <span v-else><v-ons-icon style="color: orange" icon="md-circle" size="40px"></v-ons-icon></span>
          </v-ons-button>
          <v-ons-button modifier="quiet" @click="event.cssClass='green'; showColorPicker=false;">
            <span v-if="event.cssClass==='green'"><v-ons-icon style="color: rgb(49, 155, 49)" icon="md-check-circle" size="40px"></v-ons-icon></span>
            <span v-else><v-ons-icon style="color: rgb(49, 155, 49)" icon="md-circle" size="40px"></v-ons-icon></span>
          </v-ons-button>
        </p>
      </v-ons-page>
    </v-ons-dialog>

    <v-ons-list>
      <v-ons-list-item tappable @click="showColorPicker=true">
        <label class="left">Calendar</label>
        <div class="right">
          <span v-if="event.cssClass==='red'"><v-ons-icon style="color: rgb(235, 77, 77)" icon="md-circle" size="20px"></v-ons-icon></span>
          <span v-else-if="event.cssClass==='blue'"><v-ons-icon style="color: rgb(59, 59, 163)" icon="md-circle" size="20px"></v-ons-icon></span>
          <span v-else-if="event.cssClass==='orange'"><v-ons-icon style="color: orange" icon="md-circle" size="20px"></v-ons-icon></span>
          <span v-else-if="event.cssClass==='green'"><v-ons-icon style="color: rgb(49, 155, 49)" icon="md-circle" size="20px"></v-ons-icon></span>
          <span v-else><v-ons-icon icon="md-circle-o" style="color: rgb(200, 200, 200)" size="20px"></v-ons-icon></span>
          &nbsp;{{ event.cssClass === '' ? 'none' : event.cssClass }}
        </div>
      </v-ons-list-item>
    </v-ons-list>

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

//import ColorPicker from './ColorPicker';

export default {
  name: 'NewEvent',
  data() {
    return {
      showColorPicker: false,
      event: {
        title: '',
        start: format(new Date(), 'YYYY-MM-DD'),
        end: format(new Date(), 'YYYY-MM-DD'),
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
    }
  }
}
</script>

<style>
.color-picker .dialog-container {
  height: 120px;
}
</style>
