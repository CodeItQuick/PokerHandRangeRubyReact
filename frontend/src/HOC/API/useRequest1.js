
// hooks/UseDataApi.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const url = "http://localhost:3001/";

const useRequest1 = (props, requestURL, getOrPost) => {
  // This is just for demo purposes, you probably want to separate the data from loading state and potentially add other states such as failures, etc..
  const [dataState, setDataState] = useState({ data: [], isFetching: false }); 
  const [endpointUrl] = useState(url);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setDataState({ ...dataState, isFetching: true });
        console.log(endpointUrl + requestURL);
        let response;
        if(getOrPost === "post")
        {
            response = await axios.post(endpointUrl + requestURL, props.params);
        }
        else
        {
            response = await axios.get(endpointUrl + requestURL, props.params);
        }
        console.log(response);
        setDataState({
          ...dataState,
          data: response.data,
          isFetching: false
        });

      } catch (e) {
        console.log(e);
        setDataState({ ...dataState, isFetching: false });
      }
    };
    fetchDataFromApi();
  }, [props]); // Runs once

  return [dataState];
};

export default useRequest1;