<template>
  <span>
    <span v-if="color==='red'"><v-ons-icon style="color: rgb(235, 77, 77)" icon="md-circle" size="20px"></v-ons-icon></span>
    <span v-else-if="color==='blue'"><v-ons-icon style="color: rgb(59, 59, 163)" icon="md-circle" size="20px"></v-ons-icon></span>
    <span v-else-if="color==='orange'"><v-ons-icon style="color: orange" icon="md-circle" size="20px"></v-ons-icon></span>
    <span v-else-if="color==='green'"><v-ons-icon style="color: rgb(49, 155, 49)" icon="md-circle" size="20px"></v-ons-icon></span>
    <span v-else><v-ons-icon icon="md-circle-o" style="color: rgb(200, 200, 200)" size="20px"></v-ons-icon></span>
    {{ (!color || color === '' ) ? 'none' : color | capitalize }}
  </span>
</template>

<script>
export default {
  name: 'ColorLabel',
  props: ['color'],
  filters: {
    capitalize: (value) => {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
}
</script>

<style></style>
