import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo-t.png";
import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";
import { FaHome, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/login");
  };
  return (
    <>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <Link>
              <img src={logo} className="logo" />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/">
              <FaHome id="homeLink" />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem>
            <Link to="/listUsers">List of Users</Link>
          </NavItem>
          <NavItem>
            <Link onClick={handlelogout}>
              <FaSignOutAlt id="logOut" />
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
