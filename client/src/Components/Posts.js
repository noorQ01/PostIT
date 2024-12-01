import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts, likePost } from "../Features/PostSlice";
import { Table, Label } from "reactstrap";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const email = useSelector((state) => state.users.user.email);
  const userId = useSelector((state) => state.users.user._id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLikePost = (postId) => {
    const postData = {
      postId: postId,
      userId: userId,
    };
    dispatch(likePost(postData));
    navigate("/");
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <div className="postsContainer">
      <Table>
        <thead></thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>
                <Label>{post.email}</Label>
                <br />
                <p className="postTime">
                  {moment(post.createdAt).fromNow()}
                </p>{" "}
                {post.postMsg}
                <p className="likes">
                  <a href="#" onClick={() => handleLikePost(post._id)}>
                    <FaThumbsUp />
                  </a>
                  ({post.likes.count})
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Posts;
