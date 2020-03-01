// API CONSTANTS

const BASE_URL = 'http://localhost:3001';
const HAND_RANGE_USER_URL = BASE_URL + '/hand_ranges/show_user_id/';
const HAND_RANGE_FOLDER_URL = BASE_URL + '/hand_range_folders';
const HAND_RANGE_GROUP_URL = BASE_URL + '/hand_range_groups';

// Redux Actions

const addHRAction = hrObj => ({
  type: 'SET_HAND_RANGE',
  payload: hrObj
});
const getHRAction = () => ({
    type: 'GET_HAND_RANGES'
  });

const addHRFAction = hrfObj => ({
  type: 'SET_HAND_RANGE_FOLDER',
  payload: hrfObj
})
const addHRGAction = hrfObj => ({
  type: 'SET_HAND_RANGE_GROUP',
  payload: hrfObj
})

const newHRFToDB = hrUserID => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(hrUserID);
  fetch(HAND_RANGE_FOLDER_URL, config)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        dispatch(addHRFAction(data));
      });
    
};

const newHRGToDB = hrUserID => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  fetch(HAND_RANGE_GROUP_URL, config)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        dispatch(addHRGAction(data));
      });
    
};

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
    getHRAction,
    newHRFToDB,
    newHRGToDB
};