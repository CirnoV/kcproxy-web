/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useRef, useCallback, FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [login, setLogin] = useState<boolean>();
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = async () => {
      let res = await axios.post("/login", {
        username: usernameInput.current?.value,
        password: passwordInput.current?.value,
      });
      if (res.status === 200) {
        setLogin(true);
      }
    };
    auth();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios("/entry");
      if (res.status === 200) {
        setLogin(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <form
        css={css`
          display: flex;
          flex-direction: column;
        `}
        onSubmit={handleSubmit}
      >
        <input ref={usernameInput} placeholder="username" />
        <input ref={passwordInput} placeholder="password" type="password" />
        <button>Login</button>
      </form>
      {login && (
        <Link to="/kancolle">
          <button>start</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
