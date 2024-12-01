import "./App.css";
import "./Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Logout from "./Components/Logout";
import UpdateUser from "./Components/UpdateUser";
import ListUsers from "./Components/ListUsers";
import { useSelector } from "react-redux";
import Posts from "./Components/Posts";
const App = () => {
  const email = useSelector((state) => state.users.user.email);
  return (
    <Container fluid>
      <Router>
        <Row>
          {email ? (
            <>
              <Header />
            </>
          ) : null}
        </Row>
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/posts" element={<Posts />}></Route>
            <Route
              path="/update/:user_email/:user_name/:user_password"
              element={<UpdateUser />}
            ></Route>
            <Route path="/listUsers" element={<ListUsers />}></Route>
          </Routes>
        </Row>
        <Row>
          {email ? (
            <>
              <Footer />
            </>
          ) : null}
        </Row>
      </Router>
    </Container>
  );
};

export default App;
