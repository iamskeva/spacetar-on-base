import React from "react";
import Preloader from "../../components/Preloader/Preloader.jsx";
import Timer from "../../components/Countdown/Timer";
import Optin from "../../components/Optin/Optin";
import "./ComingSoon.css";

function ComingSoon() {
  return (
    <div className="comingsoon">
      <div className="container">
        <h1>
          Spacetar is
          <br />
          Coming Soon
        </h1>
        <Timer />
        <Optin />
        <Preloader />
      </div>
    </div>
  );
}
export default ComingSoon;