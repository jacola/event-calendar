<template>
  <span>
    <v-ons-dialog class="color-picker" :visible.sync="showColorPicker" cancelable>
      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">Select Color</div>
        </v-ons-toolbar>

        <p style="text-align: center">
          <v-ons-button modifier="quiet" @click="pickColor('')">
            <v-ons-icon icon="md-circle-o" style="color: rgb(200, 200, 200)" size="40px"></v-ons-icon>
          </v-ons-button>
          <v-ons-button modifier="quiet" @click="pickColor('red')">
            <span v-if="color==='red'"><v-ons-icon style="color: rgb(235, 77, 77)" icon="md-check-circle" size="40px"></v-ons-icon></span>
            <span v-else><v-ons-icon style="color: rgb(235, 77, 77)" icon="md-circle" size="40px"></v-ons-icon></span>
          </v-ons-button>
          <v-ons-button modifier="quiet" @click="pickColor('blue')">
            <span v-if="color==='blue'"><v-ons-icon style="color: rgb(59, 59, 163)" icon="md-check-circle" size="40px"></v-ons-icon></span>
            <span v-else><v-ons-icon style="color: rgb(59, 59, 163)" icon="md-circle" size="40px"></v-ons-icon></span>
          </v-ons-button>
          <v-ons-button modifier="quiet" @click="pickColor('orange')">
            <span v-if="color==='orange'"><v-ons-icon style="color: orange" icon="md-check-circle" size="40px"></v-ons-icon></span>
            <span v-else><v-ons-icon style="color: orange" icon="md-circle" size="40px"></v-ons-icon></span>
          </v-ons-button>
          <v-ons-button modifier="quiet" @click="pickColor('green')">
            <span v-if="color==='green'"><v-ons-icon style="color: rgb(49, 155, 49)" icon="md-check-circle" size="40px"></v-ons-icon></span>
            <span v-else><v-ons-icon style="color: rgb(49, 155, 49)" icon="md-circle" size="40px"></v-ons-icon></span>
          </v-ons-button>
        </p>
      </v-ons-page>
    </v-ons-dialog>

    <v-ons-list>
      <v-ons-list-item tappable @click="showColorPicker=true">
        <label class="left">Calendar</label>
        <div class="right">
          <color-label :color="color"></color-label>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </span>
</template>

<script>
import ColorLabel from './ColorLabel';

export default {
  name: 'ColorPicker',
  props: ['color'],
  data () {
    return {
      showColorPicker: false
    }
  },
  methods: {
    pickColor(selection) {
      this.showColorPicker = false;
      this.$emit('setColor', selection);
    }
  },
  components: {
    ColorLabel
  }
}
</script>

<style>
.color-picker .dialog-container {
  height: 120px;
}
</style>
