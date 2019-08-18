import Vue from 'vue';
import Router from 'vue-router';

import CalendarHome from './components/CalendarHome';
import EventDetails from './components/EventDetails';
import NewEvent from './components/NewEvent';

Vue.use(Router);


//const extend = name => ({ name, extends: Template });

export default new Router({
  routes: [
    {
      path: '/',
      component: CalendarHome,
      name: 'home',
      children: [
        {
          path: '/eventdetails',
          name: 'eventdetails',
          component: EventDetails,
          props: { id: -7 }
        }
      ]
    },
    {
      path: '/new',
      component: NewEvent,
      name: 'new'
    }
  ]
});
