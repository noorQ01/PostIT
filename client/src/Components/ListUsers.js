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
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser } from "../Features/UserSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ListUsers = () => {
  const userList = useSelector((state) => state.users.value);
  const email = useSelector((state) => state.users.user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1>List of Users</h1>
          <Table>
            <tbody>
              {userList.map((user) => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <Button onClick={() => handleDelete(user.email)}>
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Button>
                      <Link
                        to={`/update/${user.email}/${user.name}/${user.password}`}
                        className="nav-link "
                      >
                        Update
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListUsers;
