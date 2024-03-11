import { useState, useEffect } from "react";
import { useAuth } from "../../Context/context";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`
      );
      if (res.data.ok) {
        setOk(false);
      } else {
        setOk(true);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
