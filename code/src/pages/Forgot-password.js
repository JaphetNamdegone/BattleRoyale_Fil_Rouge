import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

function ForgotPassword() {
  // const [email, setEmail] = useState("");
  const [email] = useState("");

  return <>
    <Menu />
    {/********************** DISPLAY PAGE **********************/}
    <div className="div-form">
      {/********************** TITLE **********************/}
      <h1 className="title-page">Accéder à votre compte</h1>

      {/********************** FORM TO CHANGE PASSWORD **********************/}
      <form className="custom-form" ref={this.form} onChange={this.onChange}>

        <label className="custom-label">Inscrivez votre adresse email</label>
        <input
          className="custom-input"
          type="email"
          name={email}
          placeholder="Email"

        />
      </form>
    </div>
    <button id="mySubmit" className="custom-button" disabled>Continuer</button>

    <Link to="/modify-password">Modifier votre mot de passe</Link>

  </>

}
export default ForgotPassword;
