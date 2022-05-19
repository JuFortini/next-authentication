import { destroyCookie } from "nookies";
import { useContext, useEffect } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { AuthTokenError } from "../errors/AuthTokenError";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";

import styles from "../styles/Home.module.scss";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  
  const { user } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list'],
  })

  useEffect(() => {
    api.get("/me").then(response => console.log('dashboard', response))
  }, []);

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <h2>Hello, {user?.email}</h2>
      { userCanSeeMetrics && <p>METRICS</p> }
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