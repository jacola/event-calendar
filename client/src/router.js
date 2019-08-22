import Vue from 'vue';
import Router from 'vue-router';

import CalendarHome from './components/CalendarHome';
import EventDetails from './components/EventDetails';
import NewEvent from './components/NewEvent';
import EditEvent from './components/EditEvent';

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
          path: '/details/:id',
          name: 'eventdetails',
          component: EventDetails,
          children: [
            {
                path: '/edit/:id',
                name: 'editevent',
                component: EditEvent
            }
          ]
        },
        {
          path: '/new/',
          component: NewEvent,
          name: 'newevent'
        }
      ]
    }
  ]
});
