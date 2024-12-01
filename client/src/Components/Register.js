import {
  Container,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  Table,
} from "reactstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";
import logo from "../Images/logo-t.png";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addUser, deleteUser, updateUser } from "../Features/UserSlice";
import { Link } from "react-router-dom";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const userList = useSelector((state) => state.users.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      console.log("Form data", data);
      alert("Validation all good.");
      dispatch(registerUser(userData));
      navigate("/login");
    } catch (error) {
      console.log("ERROR!");
    }
  };

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };
  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={3} className="center">
              <img src={logo} className="banner" />
            </Col>
          </Row>
          <Row>
            <Col md={3} className="center">
              <FormGroup>
                <Label for="name">Name</Label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name..."
                  type="text"
                  {...register("name", {
                    onChange: (e) => setname(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error">{errors.name?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="center">
              <FormGroup>
                <Label for="email">Email</Label>
                <input
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email..."
                  type="email"
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error">{errors.email?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="center">
              <FormGroup>
                <Label for="password">Password</Label>
                <input
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password..."
                  type="password"
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error">{errors.password?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="center">
              <FormGroup>
                <Label for="password">Confirm Password</Label>
                <input
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Confirm your password..."
                  type="password"
                  {...register("confirmpassword", {
                    onChange: (e) => setconfirmpassword(e.target.value),
                  })}
                />
              </FormGroup>
              <p className="error">{errors.confirmpassword?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={1} className="center">
              <Button>Register</Button>
            </Col>
          </Row>
          <Row>
            <Col md={2} className="center">
              <p className="smalltext center">
                Have account? <Link to="/login">Sign In now.</Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
