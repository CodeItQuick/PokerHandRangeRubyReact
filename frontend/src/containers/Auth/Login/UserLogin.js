import React, { useState, useEffect } from "react";
import { Select, Button, Form, Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import MainContainer from "../../../components/MainContainer";
// import UseRequest1API from "../../HOC/API/useRequest1";
import { useDispatch, useSelector } from "react-redux";

import reducer from "../reducer.js";
import saga from "../saga.js";
import { initRegisterUser, userSignin } from "../actions.js";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar from "../../../components/NavBar";

import { useInjectReducer } from "../../../HOC/useInjectReducer.js";
import { useInjectSaga } from "../../../HOC/injectSaga.js";

const key = "user";

export const UserLogin = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const [registerForm, updateRegisterForm] = useState({
    name: "",
    password: ""
  });
  const onChangeHandler = (e, { name, value }) => {
    const newFormValues = { ...registerForm };
    newFormValues[[name]] = value;
    updateRegisterForm(newFormValues);
  };

  const onSubmitHandler = (e, data) => {
    dispatch(userSignin(registerForm));
  };

  return (
    <MainContainer>
      <Navbar />
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
    </MainContainer>
  );
};

const mapStateToProps = state => {
  return {
    // reducers: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // fetchBooks: () => {
    //   hrActions.getAll().then(hand_ranges =>
    //     dispatch({
    //       type: "GET_HAND_RANGES",
    //       hand_ranges
    //     })
    //   );
    // }
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserLogin)
);
