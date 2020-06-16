import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import  {Form, Col, Button } from "react-bootstrap";
import * as yup from "yup";
import io from "socket.io-client";
import "./Chat.scss";
import ChatMessages from './ChatMessages';
import * as API from "../lib/requests";
import { getChatMessages, sendNewMessage } from "../lib/requests";
const SOCKET_IO_URL = API.URL;
const socket = io(SOCKET_IO_URL);

const schema = yup.object({
  message: yup.string().required("Message is required"),
});

function Chat({userData}) {
  const [initialized, setInitialized] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSubmit =  async values => {
    const isValid = await schema.validate(values);
    if (!isValid) {
      return;
    }
    try{
      const newMessage = Object.assign({}, values);
      newMessage.content = values.message;
      newMessage.userId = userData.id;
      await sendNewMessage(newMessage);
    }
    catch (error) {
      console.log(error);
      alert(error.toString());
    }
  };

  const connect = () => {
    socket.on("connect", data => {
      console.log("connect to socket " ,userData)
      socket.emit("join", userData);
    });

    socket.on("newMessage", data => {
      setMessages(prevArray => [data, ...prevArray])
    });
    setInitialized(true);
  };

  const getMessages = async () => {
    const data = await getChatMessages(userData);
    setMessages(data);
    setInitialized(true);
  };

  useEffect(() => {
    if (!initialized) {
      getMessages();
      connect();
    }
  });

  const drawForm = () =>{
    return (
      <Formik validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values)
        resetForm()
      }}
      initialValues={{message:''}}
    >
    {({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    isInvalid,
    errors,
    isSubmitting
    }) => (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="nickname">
          <div className="embed-submit-field">
          <Form.Control 
            type="text"
            name="message"
            placeholder="Message"
            value={values.message || ""}
            onChange={handleChange}
            isInvalid={touched.message && errors.message}
          />
          <Button type="submit" className="send-message-btn" disabled={isSubmitting} style={{ marginRight: "12px" }}>
            Send
          </Button>
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    </Form>
    )}
    </Formik>
    )
  }

  return (
    <div className="chat-page">
      <h1> Hello {userData.nickname}, have fun </h1>
      <ChatMessages messages={messages} userData={userData}/>
      { drawForm() }
    </div>
  );
}

export default Chat;