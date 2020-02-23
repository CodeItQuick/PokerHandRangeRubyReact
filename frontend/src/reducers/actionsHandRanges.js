// API CONSTANTS

const BASE_URL = 'http://localhost:3001';
const HAND_RANGE_USER_URL = BASE_URL + '/hand_ranges/show_user_id/';
// const PERSIST_URL = BASE_URL + '/persist';
// const LOGIN_URL = BASE_URL + '/login';
// const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Redux Actions

const addHRAction = hrObj => ({
  type: 'SET_HAND_RANGE',
  payload: hrObj
});
const getHRAction = () => ({
    type: 'GET_HAND_RANGES'
  });


const newHRToDB = hrUserID => dispatch => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(hrUserID);
    fetch(HAND_RANGE_USER_URL + hrUserID, config)
      .then(r => r.json())
      .then(data => {
          console.log(data);
          dispatch(addHRAction(data));
        });
      
  };

export default {
    addHRAction,
    newHRToDB,
    getHRAction
};