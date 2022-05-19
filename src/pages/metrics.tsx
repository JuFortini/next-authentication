import { withSSRAuth } from "../utils/withSSRAuth";

import styles from "../styles/Home.module.scss";

export default function Metrics() {
  return (
    <div className={styles.container}>
      <h2>Métricas</h2>
    </div>
  );
}


export const getServerSideProps = withSSRAuth(async () => {

  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})