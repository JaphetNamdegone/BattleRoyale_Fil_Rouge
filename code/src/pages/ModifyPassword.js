// import React, { useState } from "react";
import React from "react";
import Menu from "../components/Menu";
class ModifyPassword extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { value: "" };
    this.password = "";
    this.passwordConfirm = "";

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    const password1 = document.querySelector(".double-password-input");
    const password2 = document.querySelector(".double-passwordConfirm-input");
    if (password1.value === password2.value) {
      alert("Voulez-vous enregistrer votre mot de passe ? " + password1.value);
    } else {
      alert("Mot de passe erroré!!! Veuillez le modifier");
    }
    event.preventDefault();
  }

  render() {
    return (
        <>
          <Menu />
          <div className="global">
            <h4 className="title-page">Modifiez votre mot de passe</h4>

            <form>
              <input
                className="double-password-input"
                type="text"
                value={this.password.value}
                placeholder="mot de passe"
                onChange={this.handleChange}
                name="password"
              />
              <input
                className="double-passwordConfirm-input"
                type="text"
                value={this.passwordConfirm.value}
                placeholder="confirmer votre mot de passe"
                onChange={this.handleChange}
                name="password-confirm"
              />
              <button className="continous" onClick={this.handleSubmit}>
                Continuer
              </button>
            </form>
          </div>
        </>
    );
  }
}
export default ModifyPassword;
