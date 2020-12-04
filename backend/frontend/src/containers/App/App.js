import React, { useEffect, useState, memo } from "react";
import "./App.css";
import MainPage from "../MainPage/index";
import { Menu } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useInjectReducer } from "../../HOC/useInjectReducer";
import { connect } from "react-redux";
import { compose } from "redux";

import { steps } from "./steps";
import reducer from "../MainPage/reducer";
import Navbar from "../../components/NavBar";
import MainContainer from "../../components/MainContainer";

import Tour from "reactour";

import { useAuth0 } from "@auth0/auth0-react";

import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";
import {
  initStartConversation,
  startConnectChat,
  emptyChatSessionFn,
  resetError,
} from "../MainPage/actions";
import {
  makeSelectHelpChat,
  makeSelectChatSessionFn,
  makeSelectChatSessionFnErr,
} from "../MainPage/selectors";

import onCall from "./ONCALL.png";
import operator from "./OPERATOR.png";
import "amazon-connect-chatjs";

const key = "global";

const App = ({ helpChat, chatSessionFn = false, err = false }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  useInjectReducer({ key, reducer });
  const dispatch = useDispatch();
  const [isTourOpen, updateTourOpen] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const [token, updateToken] = useState();
  const [ChatSession, updateChatSession] = useState(false);
  const [ContentType, updateContentType] = useState(
    "application/vnd.amazonaws.connect.event.chat.ended"
  );

  const closeTour = () => updateTourOpen(false);

  useEffect(() => {
    if (err === true) {
      addResponseMessage(
        "Resetting Chat. Either type 'Talk to an agent' to talk to an agent, or help to start an automated chat bot"
      );
      dispatch(resetError());
    }
  }, [err]);

  const handleNewUserMessage = (newMessage) => {
    if (ChatSession) {
      try {
        ChatSession.sendMessage({
          message: newMessage,
          contentType: "text/plain",
        });
      } catch (err) {
        addResponseMessage(
          "Could not understand your message. Either type 'Talk to an agent' to talk to an agent, or help to start an automated chat bot"
        );
      }

      return;
    }

    if (newMessage !== "Talk to an agent" && ChatSession === false) {
      let newChat = helpChat;
      newChat.inputTranscript = newMessage;
      if (ChatSession === false) dispatch(initStartConversation(newChat));
    } else if (ChatSession === false) {
      dispatch(startConnectChat());
    } else {
      addResponseMessage(
        "Could not understand your message. Either type 'Talk to an agent' to talk to an agent, or help to start an automated chat bot"
      );
    }
    // Now send the message throught the backend API
  };

  useEffect(() => {
    addResponseMessage(
      "Welcome from support. Please type help to begin. To talk to an agent at any time type 'Talk to an agent'"
    );
  }, []);

  useEffect(() => {
    if (
      ContentType === "application/vnd.amazonaws.connect.event.participant.left"
    )
      addResponseMessage(
        "You have been disconnect from chat. To restart chat type 'Talk to an agent'"
      );
    if (ContentType === "application/vnd.amazonaws.connect.event.chat.ended") {
      updateChatSession(false);
      dispatch(emptyChatSessionFn());
    }
  }, [ContentType]);

  useEffect(() => {
    if (chatSessionFn) {
      let ChatSessionCreate = window.connect.ChatSession.create(chatSessionFn);
      ChatSessionCreate.connect()
        .then((session) => {
          // console.log(session);
        })
        .catch((err) => console.log(err));
      const { controller } = ChatSessionCreate;
      const CHAT_EVENTS = {
        INCOMING_MESSAGE: "INCOMING_MESSAGE",
        INCOMING_TYPING: "INCOMING_TYPING",
        CONNECTION_ESTABLISHED: "CONNECTION_ESTABLISHED",
        CONNECTION_LOST: "CONNECTION_LOST",
        CONNECTION_BROKEN: "CONNECTION_BROKEN",
        CONNECTION_ACK: "CONNECTION_ACK",
        CHAT_ENDED: "CHAT_ENDED",
      };
      controller.subscribe(CHAT_EVENTS.INCOMING_MESSAGE, ({ data }) => {
        updateContentType(data.ContentType);
        if (data.Content && data.DisplayName !== "Anonymous User")
          addResponseMessage(data.Content);
      });

      updateChatSession(controller);
    }
  }, [chatSessionFn]);

  useEffect(() => {
    if (!chatSessionFn && helpChat?.fulfillmentState?.Fulfilled) {
      handleNewUserMessage("Talk to an agent");
    }

    if (!chatSessionFn && Array.isArray(helpChat.message))
      helpChat.message
        .filter(({ title }) => title)
        .forEach(({ title }) => addResponseMessage(title));
  }, [helpChat.message]);

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://dev-824eb3ar.us.auth0.com/api/v2/`,
          scope: "read:current_user update:current_user_metadata",
        });
        updateToken(accessToken);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getAccessTokenSilently]);

  return (
    <>
      <nav>
        <MainContainer>
          <Navbar
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
            user={user}
            token={token}
            updateTourOpen={updateTourOpen}
          />
        </MainContainer>
      </nav>
      <main>
        <MainContainer>
          <MainPage token={token} />
          <Tour steps={steps} isOpen={isTourOpen} onRequestClose={closeTour} />
          <Menu inverted>
            <Menu.Item>Copyright poker-range-appalyzer.com</Menu.Item>
          </Menu>
        </MainContainer>
      </main>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Poker Range Appalyzer"
        subtitle="Welcome to Support"
        profileAvatar={operator}
        titleAvatar={onCall}
      />
    </>
  );
};

const mapStateToProps = () => {
  const getHelpChat = makeSelectHelpChat();
  const getChatSessionFn = makeSelectChatSessionFn();
  const getChatSessionFnErr = makeSelectChatSessionFnErr();

  const mapState = (state) => {
    return {
      helpChat: getHelpChat(state),
      chatSessionFn: getChatSessionFn(state),
      err: getChatSessionFnErr(state),
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(App);
