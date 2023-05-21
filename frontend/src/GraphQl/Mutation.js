import { gql } from "@apollo/client";

export const REGISTER_USER_MUTATION = gql`
mutation registerUser(
    $firstname: String!,
    $lastname: String!,
    $email: String!, 
    $password: String!,
    $school:String!,
    $level:String!,
    $image: String!
    ){ 
        registerUser(firstname: $firstname,lastname:$lastname, email: $email, password: $password,school:$school,level:$level,image:$image){ 
            user { 
                Id 
                firstname 
                email 
                role
                image
            } 
        } 
    }`;

export const LOGIN_USER_MUTATION = gql`
mutation loginUser( 
    $email: String!, 
    $password: String!
    ){ 
        loginUser(email: $email, password: $password) { 
            user {
                Id 
                accessToken
                image
                email
            } 
        } 
    }`;

export const GET_SCORE_MUTATION = gql`
    mutation getScore( 
        $idQuestion: String!, 
        $reponse: String!
        ){ 
            getScore(idQuestion: $idQuestion, reponse: $reponse) { 
                score {
                    idQuestion 
                    score
                    userId
                    reponse
                    date
                } 
            } 
        }`;

export const LOGOUT_USER_MUTATION = gql`
    mutation logoutUser{ 
            logoutUser { 
                user {
                    Id 
                    accessToken
                    image
                    email
                } 
            } 
        }`;

// export const LOGOUT_USER_MUTATION = gql`
// `;