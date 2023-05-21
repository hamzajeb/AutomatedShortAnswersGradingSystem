import { gql } from "@apollo/client";




export  const CURRENT_USER = gql`
query {
    currentUser {
    firstname
    email
    image
    role
    school
    level
  }
}
`;

export  const GET_ALL_SCORES   = gql`
query {
  scoresAlluser {
    userId
    reponse
    idQuestion
    score
    userName
    image
  }
}
`;


export  const CURRENT_USER_SCORES   = gql`
query {
  scoresCurrentUser {
    date
    reponse
    idQuestion
    score
  }
}
`;







