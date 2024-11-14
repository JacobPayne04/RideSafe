import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Styling/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const loginPayload = { email, password };

    try {
      const res = await axios.post('http://localhost:8080/login', loginPayload, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data.message === 'Login successful') {
        navigate('/drivers');
      } else {
        setErrorMsg(res.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Error during login:', err);
      setErrorMsg(
        err.response?.data?.message || 'An unexpected error occurred.'
      );
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <form onSubmit={login} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input"
        />
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
