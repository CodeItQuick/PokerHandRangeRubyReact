import React, {useState} from 'react';
import { Select, Button, Form, Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import UseRequest1API from '../../HOC/API/useRequest1';


export const UserLogin = (props) => {

    const url = "users"
    const [postQuery, setPostQuery] = useState();
    const [dataState] = UseRequest1API(postQuery, url);

    const loginUserHandler = async (e) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target.username.value);
        let newData = {"params": {
            "username": e.target.username.value, 
            "email": e.target.email.value, 
            //"password": e.target.password.value
        }}

        setPostQuery(newData);
        let returnData = await dataState;
     };

    return (
        <Container>
            <h2>User Login</h2>
            <Form onSubmit={loginUserHandler.bind(this)}>
                <Form.Field>
                    <label>Username</label>
                    <input name="username" placeholder='Username' />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input name="email" placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input name="password" type="password" placeholder='Password' />
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