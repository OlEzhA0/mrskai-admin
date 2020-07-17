import React, { useState, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import "./LoginPage.scss";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [log, setLog] = useState("");
  const [password, setPass] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const { loading, error, request } = useHttp();
  const history = useHistory();
  const validation = (name: string, value: string) => {
    if (!value || value.trim().length < 3) {
      switch (name) {
        case "log": {
          setLoginErr(true);
          break;
        }
        case "pass": {
          setPassErr(true);
          break;
        }
      }
    }
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const loginHandler = async () => {
    try {
      const data = await request("/auth/login", "POST", {
        login: log,
        password,
      }).then((res) => {
        login(res.token, res.userId);
      }).then(() => {
        history.push({
          pathname: '/products'
        })
      });

    } catch (e) {}
  };

  return (
    <div className="LoginPage">
      <p className="LoginPage__Title">Панель управления</p>
      <form className="LoginPage__Form" onSubmit={submitForm}>
        <input
          type="text"
          className="LoginPage__Input LoginPage__Text"
          placeholder="Логин"
          value={log}
          name="log"
          onChange={(e) => setLog(e.target.value)}
          onBlur={(e) => validation(e.target.name, e.target.value)}
        />
        <input
          type="password"
          className="LoginPage__Input LoginPage__Pass"
          placeholder="Пароль"
          name="pass"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          onBlur={(e) => validation(e.target.name, e.target.value)}
        />
        <button
          type="submit"
          className="LoginPage__Login"
          disabled={loading}
          onClick={loginHandler}
        >
          Вход
        </button>
      </form>
    </div>
  );
};
