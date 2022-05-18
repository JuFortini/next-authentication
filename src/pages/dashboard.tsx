import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

import styles from "../styles/Home.module.scss";

export default function Dashboard() {
  
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <h2>Hello, {user?.email}</h2>
    </div>
  );
}