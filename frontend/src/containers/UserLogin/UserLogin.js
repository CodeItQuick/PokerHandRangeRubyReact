import React, {useState} from 'react';
import { Select, Button, Form, Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import UseRequest1API from '../../HOC/API/useRequest1';
import { useDispatch } from 'react-redux';
import userActions from '../../redux/actions';


export const UserLogin = (props) => {

    const url = "users"
    const [postQuery, setPostQuery] = useState();
    const [dataState] = UseRequest1API(postQuery, url);
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
      });
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
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(userActions.loginUserToDB(loginForm));
        props.history.push('/');
    };

    const handleChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    // Destructuring keys from our local state to use in the form
    const { username, password } = loginForm;
    
    return (
        <Container>
            <h2>User Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input name="username" placeholder='Username' onChange={ handleChange } />
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
        </Container>
             
    );
};

export default UserLogin;