import {
  Container,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";
import logo from "../Images/logo-t.png";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addUser, deleteUser, updateUser } from "../Features/UserSlice";
import { useParams } from "react-router-dom"; //get the values from the url

const UpdateUser = () => {
  const userList = useSelector((state) => state.users.value);
  const dispatch = useDispatch();

  const { user_email, user_name, user_password } = useParams();

  const [name, setname] = useState(user_name);
  const [email, setemail] = useState(user_email);
  const [password, setpassword] = useState(user_password);
  const [confirmpassword, setconfirmpassword] = useState(user_password);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const handleUpdate = () => {
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(updateUser(userData));
  };

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit(handleUpdate)}>
          <Row>
            <Col md={5}>
              <img src={logo} className="logo" />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="name" hidden>
                  Name
                </Label>
                <input
                  id="name"
                  name="name"
                  placeholder="Enter your name..."
                  type="text"
                  value={name}
                  {...register("name", {
                    onChange: (e) => setname(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error">{errors.name?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="email" hidden>
                  Email
                </Label>
                <input
                  id="email"
                  name="email"
                  placeholder="Enter your email..."
                  type="email"
                  value={email}
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error">{errors.email?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="password" hidden>
                  Password
                </Label>
                <input
                  id="password"
                  name="password"
                  placeholder="Enter your password..."
                  type="password"
                  value={password}
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error">{errors.password?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="password" hidden>
                  Confirm Password
                </Label>
                <input
                  id="password"
                  name="password"
                  placeholder="Confirm your password..."
                  type="password"
                  value={password}
                  {...register("confirmpassword", {
                    onChange: (e) => setconfirmpassword(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error">{errors.confirmpassword?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Button>Update User</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateUser;
