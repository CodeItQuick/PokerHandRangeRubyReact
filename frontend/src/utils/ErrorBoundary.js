import React from "react";
import { useDispatch } from "react-redux";
import { initialState } from "../containers/MainPage/reducer";
import useInjectReducer from "../HOC/useInjectReducer";
import { resetState } from "../containers/MainPage/actions";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    localStorage.clear();
    localStorage.setItem("state", JSON.stringify({ global: initialState }));
    return { ...initialState, hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //Clear localstorage to reset the app
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong. Refresh the page to restart the application.
        </h1>
      );
    }

    return this.props.children;
  }
}
