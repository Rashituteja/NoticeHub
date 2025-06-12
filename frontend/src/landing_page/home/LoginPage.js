import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
function LoginPage() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const deleteId = location.state?.deleteId;
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
          
           if (form.username === 'admin' && form.password === 'yourpassword') {
    localStorage.setItem('role', 'admin'); 
    if (deleteId) {
        await axios.delete(`/notices/${deleteId}`);
        setMessage('Notice deleted!');
    }
    navigate('/noticeview'); 
} else {
                setMessage("You can't delete notice");
            }
        } catch (err) {
            setMessage('Error deleting notice');
        }
        try {
            const res = await axios.post('/login', form, { withCredentials: true });
            if (res.data.success) {
                localStorage.setItem('role', res.data.user.role);
                navigate('/noticeview');

            } else {
                setMessage('Login failed');
            }
        } catch (err) {
            setMessage('Invalid credentials');
        }
    };
    return (

        <div className="d-flex  justify-content-center align-items-center" style={{ backgroundImage: `url(/media/background.jpg)`, backgroundSize: "cover", height: "100vh", width: "100vw", backgroundRepeat: "no repeat" }}>


            <div className="d-flex  flex-colomn justify-content-center align-items-center" style={{ height: "50vh", width: "40vw", backgroundColor: "transparent", borderRadius: "16px", boxShadow: "10px 14px 15px 20px  rgba(0,0,0,0.5)", border: "none" }}>
                ...
                <form className="d-flex  flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
                    <input className='mb-5 p-2'
                        style={{ width: "300px", border: "none", borderRadius: "10px" }}
                        placeholder='username '
                        value={form.username}
                        name='username'
                        onChange={handleChange} />

                    <input className='mb-5 p-2'
                        style={{ width: "300px", border: "none", borderRadius: "10px" }}
                        placeholder='password' name='password'

                        onChange={handleChange}

                        type='password'
                        value={form.password}
                    />
                    <button className='mb-4'
                        style={{ backgroundColor: "rgb(42, 42, 121)", color: "white", marginLeft: "100px", padding: "5px 20px", borderRadius: "5px" }}
                        type='submit'

                    > Submit</button>

                    {message && <div style={{ color: "red", marginTop: "10px" }}>{message}</div>}
                </form>
                ...
            </div>

        </div>
    );
}

export default LoginPage;