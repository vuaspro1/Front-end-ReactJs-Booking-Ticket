import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleLoginRedux } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);

  const handleSubmit = async () => {
    if (!userName || !password) {
      toast.error("Username/Password is required!");
      return;
    }
    dispatch(handleLoginRedux(userName, password));
    // let res = await loginApi(userName, password);
    // if (res && res.accessToken) {
    //   localStorage.setItem("token", res?.accessToken);
    //   localStorage.setItem("userName", res?.userName);
    //   localStorage.setItem("auth", res?.roles[0].name);
    //   window.location.href = "/";
    // } else {
    //   if (res && res.status === 400) {
    //     toast.error("Login failed!");
    //   }
    // }
  };

  useEffect(() => {
    if (account && account.auth != null) {
      // console.log("dsfcsd");
      // window.location.href = "/";
    }
  }, [account]);

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Username:</div>
        <input
          type="username"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="text">Password:</div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={userName && password ? "active" : ""}
          disabled={userName && password ? false : true}
          onClick={() => handleSubmit()}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
