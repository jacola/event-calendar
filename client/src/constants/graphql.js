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
