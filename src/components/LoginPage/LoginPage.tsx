import cn from "classnames";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";
import "./LoginPage.scss";

interface Log {
  login: string;
  pass: string;
}

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const history = useHistory();

  const [log, setLog] = useState<Log>({
    login: "",
    pass: "",
  });

  const [logDataErr, setLogDataErr] = useState({
    loginErr: false,
    passErr: false,
  });

  const [logErr, setLogErr] = useState("");

  const changeLogDataErr = (name: string, value: boolean) => {
    setLogDataErr({ ...logDataErr, [name]: value });
  };

  const validation = (name: string, value: string) => {
    if (!value || value.trim().length < 3) {
      switch (name) {
        case "login": {
          changeLogDataErr("loginErr", true);
          break;
        }

        case "pass": {
          changeLogDataErr("passErr", true);

          break;
        }
      }
    }
  };

  const changeLoginData = (name: string, value: string) => {
    setLog({ ...log, [name]: value });
    setLogDataErr({ loginErr: false, passErr: false });

    if (logErr) {
      setLogErr("");
    }
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const loginHandler = async () => {
    if (!log.login || !log.pass) {
      setLogDataErr({ loginErr: true, passErr: true });
      return;
    }

    try {
      await request("/auth/login", "POST", {
        login: log.login,
        password: log.pass,
      })
        .then((res) => {
          if (res === "Неверный логин или пароль") {
            setLogErr(res);
            setLogDataErr({ loginErr: true, passErr: true });
            throw new Error(res);
          } else {
            login(res.token, res.userId);
          }
        })
        .then(() => {
          history.push({
            pathname: "/products",
          });
        });
    } catch (e) {}
  };

  return (
    <div className="LoginPage">
      <p className="LoginPage__Title">Панель управления</p>
      <form className="LoginPage__Form" onSubmit={submitForm}>
        <input
          type="text"
          className={cn({
            LoginPage__Input: true,
            "LoginPage__Input--error": logErr || logDataErr.loginErr,
          })}
          placeholder="Логин"
          value={log.login}
          name="login"
          onChange={(e) => {
            changeLoginData(e.target.name, e.target.value);
          }}
          onBlur={(e) => validation(e.target.name, e.target.value)}
        />
        <input
          type="password"
          className={cn({
            LoginPage__Input: true,
            "LoginPage__Input--error": logErr || logDataErr.passErr,
          })}
          placeholder="Пароль"
          name="pass"
          value={log.pass}
          onChange={(e) => {
            changeLoginData(e.target.name, e.target.value);
          }}
          onBlur={(e) => validation(e.target.name, e.target.value)}
        />
        <button
          type="submit"
          className="LoginPage__Login"
          disabled={
            loading || !!logErr || logDataErr.loginErr || logDataErr.passErr
          }
          onClick={loginHandler}
        >
          Вход
        </button>
        {logErr && (
          <p className="LoginPage__Error">
            <img
              src="images/login/authErr.svg"
              alt="auth error"
              className="LoginPage__ErrorImg"
            />
            {logErr}
          </p>
        )}
      </form>
    </div>
  );
};
