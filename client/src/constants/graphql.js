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
`
