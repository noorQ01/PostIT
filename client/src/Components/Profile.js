import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateUserProfile } from "../Features/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";

const Profile = () => {
  const user = useSelector((state) => state.users.user);

  const [userName, setuserName] = useState(user.name);
  const [pwd, setpwd] = useState(user.password);
  const [confirmPassword, setconfirmpassword] = useState(user.password);
  const [profilePic, setprofilePic] = useState(user.profilePic);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    const userData = {
      email: user.email,
      name: userName,
      password: pwd,
      profilePic: profilePic,
    };
    console.log(userData);

    dispatch(updateUserProfile(userData));
    navigate("/profile");
  };
  const handleFileChange = (event) => {
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setprofilePic(event.target.files[0]);
  };
  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user.email, navigate]);
  return (
    <Container>
      <h1>Profile</h1>
      <Row>
        <Col md={2}>
          <User />
        </Col>
        <Col md={4}>
          Update Profile
          <Form onSubmit={handleUpdate}>
            <input type="file" name="profilePic" onChange={handleFileChange} />
            <div className="appTitle"></div>
            Update Profile
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="form-control"
                placeholder="Name..."
                type="text"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="email">Email</Label>
              <input
                id="email"
                name="email"
                className="form-control"
                placeholder="Email..."
                type="email"
              />
            </FormGroup> */}
            <FormGroup>
              <Label for="password">Password</Label>
              <input
                id="password"
                name="password"
                className="form-control"
                placeholder="Password..."
                type="password"
                value={pwd}
                onChange={(e) => setpwd(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Confirm Password</Label>
              <input
                id="password"
                name="password"
                className="form-control"
                placeholder="Confirm Password..."
                type="password"
                value={confirmPassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary">Update Profile</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
