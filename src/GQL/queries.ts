import {gql} from '@apollo/client';

export const GET_EXERCISES = gql`
query Exercises {
  exercises {
    name
  }
}`

export const GET_EQUIPMENT = gql`
query Equipments {
  equipments {
    name
  }
}`

export const SEARCH_EQUIPMENT = gql`
query GetEquipmentByString($name: String!) {
  getEquipmentByString(name: $name) {
    name
  }
}`

export const SEARCH_EXERCISES = gql`
query GetExerciseByName($name: String!) {
  getExerciseByName(name: $name) {
    id
    name
    posture
    movement
    symmetry
    type
    equipment
  }
}`

export const CREATE_EXERCISE = gql`
mutation CreateExercise($input: CreateExerciseInput) {
  createExercise(input: $input) {
    name,
    type
  }
}`;