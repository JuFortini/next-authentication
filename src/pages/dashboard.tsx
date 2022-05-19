import { useContext, useEffect } from "react";

import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";
import { AuthContext } from "../contexts/AuthContext";
import { Can } from "../components/Can";

import styles from "../styles/Home.module.scss";

export default function Dashboard() {
  
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api.get("/me").then(response => console.log('dashboard', response))
  }, []);

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <h2>Hello, {user?.email}</h2>
      <Can permissions={['metrics.list']}>
        <p>METRICS</p>
      </Can>
      <button onClick={signOut}>Sair</button>
    </div>
  );
}


export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/me");
  console.log(response.data);

  return {
    props: {}
  }
})