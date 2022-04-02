import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logginIn, setLogginIn] = useState(false);
  const { addToast } = useToasts();

  const handleChange = (e) => {
    e.preventDefault();
    setLogginIn(true);

    if (!email || !password) {
      return addToast('Please enter both email and password', {
        appearanse: 'error',
      });
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleChange}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          //required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          //required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button>{logginIn ? 'LogginIn' : 'Log In'}</button>
      </div>
    </form>
  );
};

export default Login;
