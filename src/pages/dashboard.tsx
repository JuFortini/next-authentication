import { useContext, useEffect } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";

import styles from "../styles/Home.module.scss";

export default function Dashboard() {
  
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/me").then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <h2>Hello, {user?.email}</h2>
    </div>
  );
}