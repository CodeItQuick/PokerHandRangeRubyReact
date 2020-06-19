import React, { useState, useEffect, memo, Fragment } from "react";
import { Select, Button, Form, Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import MainContainer from "../../../components/MainContainer";
// import UseRequest1API from "../../HOC/API/useRequest1";
import { useDispatch, useSelector } from "react-redux";

import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import reducer from "../reducer.js";
import saga from "../saga.js";
import { initRegisterUser, userSignin } from "../actions.js";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar from "../../../components/NavBar";

import { useInjectReducer } from "../../../HOC/useInjectReducer.js";
import { useInjectSaga } from "../../../HOC/injectSaga.js";
import { makeSelectUser } from "../selectors";

const key = "user";

export const UserLogin = ({ user }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const [registerForm, updateRegisterForm] = useState({
    name: "",
    password: ""
  });
  const onChangeHandler = (e, { name, value }) => {
    const newFormValues = { ...registerForm };
    newFormValues[name] = value;
    updateRegisterForm(newFormValues);
  };

  const onSubmitHandler = (e, data) => {
    dispatch(userSignin(registerForm));
  };
  console.log(user);
  return (
    <MainContainer>
      <Navbar username={user.name} />
      {user.name == false ? (
        <Fragment>
          <h2>User Login</h2>
          <Form onSubmit={onSubmitHandler}>
            <Form.Input
              label="Username"
              name="name"
              placeholder="Name"
              onChange={onChangeHandler}
            />
            <Form.Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={onChangeHandler}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Fragment>
      ) : (
        <div>You are currently logged in.</div>
      )}
    </MainContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser()
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(UserLogin);
