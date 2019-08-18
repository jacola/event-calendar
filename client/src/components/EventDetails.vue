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
    <v-ons-bottom-toolbar>
      <v-ons-button modifier="quiet" @click="deleteEvent">Delete Event</v-ons-button>
    </v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import { DELETE_EVENT_MUTATION } from '../constants/graphql';

export default {
  name: 'EventDetails',
  //props: ['id']
  data() {
    return {
    }
  },
  methods: {
    deleteEvent() {
      const id = this.$route.params.id;
      console.log(id);
      this.$apollo.mutate({
        mutation: DELETE_EVENT_MUTATION,
        variables: {
          id
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
