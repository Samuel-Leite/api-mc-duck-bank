import React from "react";
import InputField from "./InputField";

const AuthPanel = ({ isSignUp, formData, onChange, onSubmit, onLogin }) => {
  return (
    <div className="signin-signup">
      <form
        id="sign-up-form"
        className={`sign-up-form ${isSignUp ? "active" : ""}`}
        onSubmit={onSubmit}
      >
        <h2 className="title">Sign up</h2>
        <InputField
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={onChange}
          required
        />
        <InputField
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={onChange}
          required
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <InputField
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={onChange}
          required
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          required
        />
        <button type="submit" className="btn solid">
          Sign up
        </button>
      </form>

      <form
        id="sign-in-form"
        className={`sign-in-form ${!isSignUp ? "active" : ""}`}
        onSubmit={onSubmit} // Certifique-se que aqui é o mesmo onSubmit do LoginPage
      >
        <h2 className="title">Sign in</h2>
        <InputField
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={onChange}
          required
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          required
        />
        <button type="submit" className="btn solid">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default AuthPanel;
