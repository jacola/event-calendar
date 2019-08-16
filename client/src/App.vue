<template>
  <div id="app">
    <v-ons-navigator swipeable swipe-target-width="200px"
      :page-stack="pageStack"
      :pop-page="goBack"
      ></v-ons-navigator>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    goBack() {
      this.$router.push({ name: this.$route.matched[this.$route.matched.length - 2].name });
    },
    addEvent(data) {
      this.events.push(data);
    }
  },
  created() {
    /* Define how routes should be mapped to the page stack.
    * This assumes all the routes contain VOnsPage components
    * and are provided in the 'default' view.
    * For nested named routes or routes that for some reason
    * should not be mapped in VOnsNavigator, filter them out here.
    */
      const mapRouteStack = route => this.pageStack = route.matched.map(m => m.components.default);
    /* Set initial pageStack depending on current
    * route instead of always pushing 'Home' page
    */
    mapRouteStack(this.$route);
    /* On route change, reset the pageStack to the next route */
    this.$router.beforeEach((to, from, next) => mapRouteStack(to) && next());
  },
  data() {
    return {
      pageStack: []
    }
  },
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
