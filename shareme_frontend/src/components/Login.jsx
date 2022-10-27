import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

import { client } from "../client";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import logoWhite from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";

function Login() {
  const navigate = useNavigate();

  function responseGoogle(response) {
    localStorage.setItem("user", response.credential);

    const responsePayload = jwt_decode(response.credential);

    const doc = {
      _id: responsePayload.sub,
      _type: "user",
      userName: responsePayload.name,
      image: responsePayload.picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  }

  return (
    <div className="flex felx-col justify-center items-center h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          muted
          controls={false}
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 bg-blackOverlay">
          <div>
            <img src={logoWhite} alt="logo" width="130px" />
          </div>
          <div className="flex justify-center items-center">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
