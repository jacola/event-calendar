import gql from 'graphql-tag'

export const ALL_EVENTS_QUERY = gql`
query {
  allEvents {
    id,
    title,
    start,
    end,
    cssClass,
    description
  }
}
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($title: String!,  $start: String!,  $end: String!,  $cssClass: String,  $description: String) {
    createEvent(
      title: $title,
      start: $start,
      end: $end,
      cssClass: $cssClass,
      description: $description,
    ) {
      id
      title
      start
      end
      cssClass
      description
    }
  }
`;
