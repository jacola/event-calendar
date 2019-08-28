<template>
  <span>
    <v-ons-dialog class="date-picker" :visible.sync="showDatePicker" cancelable>
      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">Select Date</div>
        </v-ons-toolbar>
        <div class="center">
          <datepicker :inline="true" :value="selectedDate" @selected="pickDate"></datepicker>
        </div>
      </v-ons-page>
    </v-ons-dialog>

    <v-ons-list>
      <v-ons-list-item tappable @click="showDatePicker=true">
        <label class="left">{{ label }}</label>
        <div class="right">
          {{ selectedDate }}
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </span>
</template>

<script>
import format from 'date-fns/format';
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'DatePickerDialog',
  props: ['selectedDate', 'label'],
  data () {
    return {
      showDatePicker: false
    }
  },
  methods: {
    /*formatter(d) {
      return format(d.toString(), 'YYYY-MM-DD');
    },*/
    pickDate(d) {
      this.showDatePicker = false;
      this.$emit('pickDate', format(d.toString(), 'YYYY-MM-DD'));
    }
  },
  components: {
    Datepicker
  }
}
</script>

<style>
.date-picker .dialog-container {
  height: 325px;
  width: 300px;
}
</style>
