import gql from 'graphql-tag'

export const ALL_EVENTS_QUERY = gql`
query {
  allEvents {
    id,
    title,
    start,
    end,
    cssClass,
    data {
      description
    }
  }
}
`;

export const EVENT_QUERY = gql`
query event ($id: ID!) {
  event(id: $id) {
    id,
    created,
    modified,
    title,
    start,
    end,
    cssClass,
    data {
      description
    }
  }
}
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($title: String!,  $start: String!,  $end: String!,  $cssClass: String, $description: String) {
    createEvent(
      input: {
        title: $title,
        start: $start,
        end: $end,
        cssClass: $cssClass,
        data: {
          description: $description
        }
     }
   ) {
      id
      title
      start
      end
      cssClass
      data {
        description
      }
    }
  }
`;

export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($id: ID!, $title: String!,  $start: String!,  $end: String!,  $cssClass: String, $description: String) {
    updateEvent(
      id: $id,
      input: {
        title: $title,
        start: $start,
        end: $end,
        cssClass: $cssClass,
        data: {
          description: $description
        }
     }
   ) {
      id
      title
      start
      end
      cssClass
      data {
        description
      }
    }
  }
`;

export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
      title
    }
  }
`;
