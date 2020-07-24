import React, { useState, memo } from "react";
import { Select, Button, Form, Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { compose } from "redux";
import reducer from "../reducer.js";

import saga from "../saga";

import { initRegisterUser } from "../actions.js";
import { makeSelectParams } from "../selectors.js";

import Navbar from "../../../components/NavBar";
import MainContainer from "../../../components/MainContainer";
import { useInjectReducer } from "../../../HOC/useInjectReducer";
import { useInjectSaga } from "../../../HOC/injectSaga";

const key = "user";

const UserRegister = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const [registerForm, updateRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const onChangeHandler = (e, { name, value }) => {
    const newFormValues = { ...registerForm };
    newFormValues[[name]] = value;
    updateRegisterForm(newFormValues);
  };

  const onRegisterUserHandler = (e, data) => {
    dispatch(initRegisterUser(registerForm));
  };

  return (
    <MainContainer>
      <Navbar />
      <h2>User Register</h2>
      <Form onSubmit={onRegisterUserHandler}>
        <Form.Input
          label="Username"
          name="name"
          placeholder="Username"
          onChange={onChangeHandler}
        />
        <Form.Input
          label="Password"
          name="password"
          placeholder="Password"
          onChange={onChangeHandler}
        />
        <Form.Input
          label="Password Confirmation"
          name="password_confirmation"
          placeholder="Password Confirmation"
          onChange={onChangeHandler}
        />
        <Form.Input
          label="email"
          name="email"
          placeholder="email"
          onChange={onChangeHandler}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </MainContainer>
  );
};
const mapStateToProps = () => {
  const getParams = makeSelectParams();
  const mapState = state => {
    return {
      params: getParams(state)
    };
  };
  return mapState;
}; //?

// const mapDispatchToProps = dispatch => {
//   return {
//     dispatchToHandRange: (data) => dispatch(setHandRange(data))
//   };
// };
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(UserRegister);
