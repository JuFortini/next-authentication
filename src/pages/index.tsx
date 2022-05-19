import { FormEvent, useContext, useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

import styles from '../styles/Home.module.scss';

export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = { email, password };

    await signIn(data);

    setEmail("");
    setPassword("");
  }

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <h2>Welcome!</h2>
      <input
        type="email"
        placeholder='E-mail'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder='Senha'
        value={password}
        onChange={e => setPassword(e.target.value)} 
      />
      <button type="submit">Entrar</button>
    </form>
  )
}


export const getServerSideProps = withSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})
