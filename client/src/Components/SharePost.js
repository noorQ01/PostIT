import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Label,
  FormGroup,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { savePost } from "../Features/PostSlice";
const SharePost = () => {
  const [postMsg, setpostMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.users.user.email);

  const handlePost = async () => {
    // Validate the postMsg is not empty
    if (!postMsg.trim()) {
      alert("Post message is required.");
      return;
    }
    const postData = {
      postMsg: postMsg,
      email: email,
    };
    dispatch(savePost(postData));
    setpostMsg(""); // for clear the textarea after posting
  };
  return (
    <Container>
      <Row>
        <Col className="sharePosts">
          <Input
          className="textarea"
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
            value={postMsg}
            onChange={(e) => setpostMsg(e.target.value)}
          />
          <Button onClick={() => handlePost()}>
            PostIT
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePost;
