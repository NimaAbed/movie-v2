import { gql } from "@apollo/client"


// const SEND_COMMENT = (data, slug) => {
//   return `mutation {
//         createComment(data: {email: "${data.email}", text:"${data.text}",haveSpoile:${data.spoile} ,movie: {connect: {slug: "${slug}"}}}) {
//           text
//           email
//           haveSpoile
//           id
//         }
//       }`
// }

const SEND_COMMENT = `mutation get($email:String! $text:String! $haveSpoile:Boolean! $slug:String!) {
  createComment(data: {email: $email, text:$text,haveSpoile:$haveSpoile ,movie: {connect: {slug: $slug}}}) {
    id
  }
}`

export { SEND_COMMENT }