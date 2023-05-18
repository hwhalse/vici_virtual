import {gql} from '@apollo/client';

export const GET_USER_INFO = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    id
    username
    first_name
    last_name
    email
    weight
    height
    birth_date
    gender
    date
    bodyfat
    muscle_mass
  }
}`

export const UPDATE_USER_STATS = gql`
mutation UpdateStats($input: UserStatsInput) {
  updateStats(input: $input) {
    id
    date
    weight
    bodyfat
    muscleMass
  }
}`

export const GET_EXERCISES = gql`
query Exercises {
  exercises {
    name
  }
}`

export const GET_USER_WORKOUTS = gql`
query GetWorkoutsByAuthor($id: Int!) {
  getWorkoutsByAuthor(id: $id) {
    id
    name
    type
    creator_id
    created_date
    level
    exercises {
      name
      sets
      reps
      rest
      weight
      equipment
    }
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

export const CREATE_WORKOUT = gql`
mutation CreateWorkout($input: CreateWorkoutInput) {
  createWorkout(input: $input) {
    name
  }
}`

export const LOG_WORKOUT = gql`
mutation LogWorkout($input: LogWorkoutInput) {
  logWorkout(input: $input) {
    user
  }
}`

export const GET_LOGGED_WORKOUTS = gql`
query GetLoggedWorkouts($userId: Int!) {
  getLoggedWorkouts(user_id: $userId) {
    id
    user_id
    date
    private
    location
    workout_id
    workout_data {
      data {
        name
        result {
          reps
          weight
        }
      }
    }
  }
}`

export const GET_USER_FEED = gql`
query GetUserFeed($id: Int!) {
  getUserFeed(id: $id) {
    user_id
    date
    location
    author_name
    workout_id
    workout_data {
      data {
        name
        result {
          reps
          weight
        }
      }
    }
  }
}`

export const SAVE_WORKOUT = gql`
mutation SaveWorkout($input: SaveWorkoutInput) {
  saveWorkout(input: $input)
}`

export const GET_WORKOUT_IDS = gql`
query GetWorkoutIds($id: Int!) {
  getWorkoutIds(id: $id) {
    workout_id
  }
}`

export const GET_WORKOUT_BY_ID = gql`
query GetWorkoutById($id: Int!) {
  getWorkoutById(id: $id) {
    id
    name
    type
    creator_id
    created_date
    level
    exercises {
      name
      reps
      rest
      equipment
    }
  }
}`

export const SEARCH_FOR_FRIENDS = gql`
query FindFriends($searchString: String) {
  findFriends(searchString: $searchString) {
    id
    username
    first_name
    last_name
    birth_date
  }
}`

export const LIKE_WORKOUT = gql`
mutation LikeWorkout($input: SaveWorkoutInput) {
  likeWorkout(input: $input)
}
`;

export const GET_WORKOUT_LIKES = gql`
query Query($workoutId: Int) {
  getWorkoutLikes(workout_id: $workoutId)
}`;

export const GET_WORKOUTS_BY_NAME = gql`
query SearchWorkoutsByName($searchString: String) {
  searchWorkoutsByName(searchString: $searchString) {
    id
    name
    type
    creator_id
    created_date
    level
    exercises {
      name
      equipment
      sets
      weight
      work
      rest
      reps
    }
  }
}`;

export const GET_GLOBAL_FEED = gql`
query GetGlobalFeed {
  getGlobalFeed {
    id
    user_id
    date
    private
    author_name
    location
    workout_id
    workout_data {
      data {
        name
        result {
          reps
          weight
        }
      }
    }
  }
}
`