import React from "react";
import RegisterForm from "../auth-components/credentials-signup";
import GoogleSignIn from "../auth-components/google-signin";

export default async function RegisterPage() {
  return (
    <div>
      <RegisterForm />
      <GoogleSignIn logType="Register"/>
    </div>
  );
}
