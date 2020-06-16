import React , {Fragment} from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import "./HomePage.css";
import { joinChat } from "../lib/requests";
import Chat from "./Chat"
import * as Utils from '../lib/Utils'
const JOIN_NICKNAME_TITLE = "Please enter your nickname";

const schema = yup.object({
  nickname: yup.string().required("nickname is required")
});

function HomePage() {
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({nickname:""})

  const handleSubmit = async event => {
    setIsLoading(true)
    const isValid = await schema.validate(event);
    if (!isValid) {
      return;
    }
    let data = await joinChat(event);
    debugger
    setUserData(data)
    if(data){
      setIsJoined(true);
      setIsLoading(false)
    } else{
      alert("Error: Cannot join to chat");
    }
  };

  useEffect(() => {});


  const drawForm = () =>{
    return(
      <Fragment>
        { !isLoading && 
          <div className="home-page">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={userData}
          >
            { ({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isInvalid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} md="12" controlId="nickname">
                    <Form.Label> {JOIN_NICKNAME_TITLE} </Form.Label>
                    <Form.Control className="nickname-input"
                      type="text"
                      name="nickname"
                      placeholder="Nickname"
                      value={values.nickname || ""}
                      onChange={handleChange}
                      isInvalid={touched.Nickname && errors.Nickname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nickname} 
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Button type="submit" style={{ marginRight: "10px" }}>
                  Join
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      }
    </Fragment>
    )
  }

  if (isJoined) {
    return <Chat userData={userData} />;
  } else{
    return (
      <Fragment>
        {
          isLoading && 
          Utils.drawLoading()
        }
       { drawForm() }
      </Fragment>
      
    );
  }
}

export default HomePage;
