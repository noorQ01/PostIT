import { Row } from "reactstrap";

const Footer = () => {
  return (
    <>
      <Row className="footer">
        <p>
          <a href="mailto:42S19177@utas.edu.om">42S19177@utas.edu.om </a>|
          &copy; {new Date().getFullYear()} | PostIT | All Rights Reserved.
        </p>
      </Row>
    </>
  );
};

export default Footer;
