import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import users from '../data/users.json';
import './login.css'

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errore, setErrore] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === form.username && u.password === form.password);
    
    if (user) {
      login(user);
      navigate('/dashboard'); 
    } else {
      setErrore("Credenziali errate!");
    }
  };

  return (
    <div className='login-container'>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Username"  value ={form.username} onChange={e => setForm({...form, username: e.target.value})} />
      <input type="password" placeholder="Password" value ={form.password} onChange={e => setForm({...form, password: e.target.value})} />
    <p className="forgot-text"> Password dimenticata? Contatta l'admin</p>
    {errore && <p className='error-message'>{errore}</p>}
      <button type="submit">Entra</button>
    </form>
    </div>
  );
};

export default Login;