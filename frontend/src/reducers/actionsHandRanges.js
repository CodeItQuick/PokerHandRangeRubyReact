// API CONSTANTS

const BASE_URL = 'http://localhost:3001';
const HAND_RANGE_USER_URL = BASE_URL + '/hand_ranges/show_user_id/';
const HAND_RANGE_FOLDER_URL = BASE_URL + '/hand_range_folders/';
const HAND_RANGE_GROUP_URL = BASE_URL + '/hand_range_groups/';

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
});
const createHRFAction = hrfObj => ({
  type: 'CREATE_HAND_RANGE_FOLDER',
  payload: hrfObj
});
const addHRGAction = hrfObj => ({
  type: 'SET_HAND_RANGE_GROUP',
  payload: hrfObj
});

const editHRFAction = hrfObj => ({
  type: 'EDIT_HAND_RANGE_FOLDER',
  payload: hrfObj
});

const editHRF = hrFolderName => dispatch => {
  const config = {
    method: 'PATCH',
    folderName: hrFolderName,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'hand_range_folders': {
        'FolderName': hrFolderName,
        'user_id': 1,
        'id': 1
      }
    })
  };
  fetch(HAND_RANGE_FOLDER_URL + '1', config)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        dispatch(editHRFAction(data));
      });
}

const createHRF = hrFolderName => dispatch => {
  const config = {
    method: 'POST',
    folderName: hrFolderName,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'FolderName': hrFolderName,
      'user_id': 1
    })
  };
  fetch(HAND_RANGE_FOLDER_URL, config)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        dispatch(createHRFAction(data));
      });
}

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
    newHRGToDB,
    createHRF,
    editHRF
};