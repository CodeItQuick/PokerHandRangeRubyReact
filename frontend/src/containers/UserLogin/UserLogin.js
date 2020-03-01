import React, {useState, useEffect} from 'react';
import { Select, Button, Form, Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
import MainContainer from '../../components/MainContainer'
import UseRequest1API from '../../HOC/API/useRequest1';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../reducers/actions';
import hrActions from '../../reducers/actionsHandRanges';

import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';


export const UserLogin = (props) => {

    const url = "users"
    const [postQuery, setPostQuery] = useState();
    const [dataState] = UseRequest1API(postQuery, url);
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
      });


    const user_id = useSelector(state => state.rootReducer.id);
    const userRanges = useSelector(state => state.handRangesAvailable.folderNames)
    // const loginUserHandler = async (e) => {
    //     e.preventDefault();
    //     // console.log(e);
    //     // console.log(e.target.username.value);
    //     // let newData = {"params": {
    //     //     "username": e.target.username.value, 
    //     //     "email": e.target.email.value, 
    //     //     //"password": e.target.password.value
    //     // }}

    //     // setPostQuery(newData);
    //     // let returnData = await dataState;

    //     fetch('http://localhost:3001/login', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             "username": e.target.username.value,
    //             "password": e.target.password.value
    //         })
    //     })
    //     .then(resp =>resp.json())
    //     .then(data => {
    //         localStorage.setItem("token", data.jwt);
    //         console.log(data);
    //     })


    //  };

    // controlled form functions
    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(userActions.loginUserToDB(loginForm));
        //props.history.push('/');
    };

    useEffect(()=> {
        if (user_id)
        {
            dispatch(hrActions.getHRAction(user_id));  
            dispatch(hrActions.newHRToDB(user_id));
            dispatch(hrActions.newHRFToDB(user_id));
            dispatch(hrActions.newHRGToDB(user_id));
            console.log(userRanges);
        } 
    }, [user_id]);

    const handleChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    return (
        <MainContainer>
            <h2>User Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input name="name" placeholder='Name' onChange={ handleChange } />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input name="password" type="password" onChange={ handleChange } placeholder='Password' />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
                
            </Form>
        </MainContainer>
             
    );
};

const mapStateToProps = (state) => {
    return {
      reducers: state
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: () => {
       hrActions.getAll().then(hand_ranges => dispatch({
         type: 'GET_HAND_RANGES',
         hand_ranges
       }))
    },

  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLogin))