import user from "../Images/user.png";
import { useSelector } from "react-redux";
import { Label } from "reactstrap";

const User = () => {
  const user = useSelector((state) => state.users.user);
  const picURL = "http://localhost:3001/uploads/" + user.profilePic;
  console.log(picURL);

  return (
    <div>
      <img src={picURL} className="userImage center" />
      <p className="userInfos">
        <Label>{user.name}</Label>
        <br />
        {user.email}
      </p>
    </div>
  );
};

export default User;
