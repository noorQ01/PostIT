import { Container, Row, Col } from "reactstrap";
import User from "./User.js";
import SharePost from "./SharePost.js";
import Posts from "./Posts.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Location from "./Location.js";

const Home = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]); //<= add this mean the page should reload if there any changes in email
  return (
    <Container>
      <Row>
        <Col md={3}>
          <User />
        </Col>
        <Col md={9}>
          <SharePost />
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Location />
        </Col>
        <Col md={9}>
          <Posts />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
