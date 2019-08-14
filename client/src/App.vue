<template>
  <div id="app">
    <div class="main">
      <div class="calendar-holder">
        <calendar :events="allEvents"/>
      </div>
      <div class="form-holder">
        <h3>Schedule an event</h3>
        <event-form @newEvent="addEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'
import EventForm from './components/EventForm.vue'
import { ALL_EVENTS_QUERY } from './constants/graphql'

export default {
  name: 'app',
  components: {
    Calendar,
    EventForm
  },
  methods: {
    addEvent(data) {
      this.events.push(data);
    }
  },
  data() {
    return {
      loading: 0,
      allEvents: []
    }
  },
  mounted: () => {
  },
  apollo: {
    allEvents: {
      query: ALL_EVENTS_QUERY
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  display: flex;
  align-items: center;
}
.calendar-holder {
  width: 65%;
}
.form-holder {
  width: 35%;
}

.form-holder > h3 {
  color: orangered;
  text-transform: uppercase;
  font-size: 16px;
  text-align: left;
  margin-left: 30px;
  margin-bottom: 10px;
}
</style>
