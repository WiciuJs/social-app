import { useState } from 'react';
import '../StyleApp/Login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = (props) => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleImputChange = (e) => {
        const target = e.target;
        const name = target.name;


        setFormData({
            ...formData,
            [name]: target.value,
        });
    };

    const [loginMassage, setLoginMassage] = useState()

    const handleSubmit = (e) =>{
        e.preventDefault();

            axios
            .post('http://akademia108.pl/api/social-app/user/login',{
              username: formData.username,
              password: formData.password,
            })
            .then((res) => {

                if(Array.isArray(res.data.username)){
                    setLoginMassage(res.data.username[0]) //można bez nawiasów jeśli jest 1 elementowa i jeśli nie jest referencją 
                }else if(Array.isArray(res.data.password)){
                    setLoginMassage(res.data.password[0])
                }else if (res.data.error){
                    setLoginMassage ('Incorrect usernmame or password')
                }else {
                    setLoginMassage('')
                    props.setUser(res.data);
                    localStorage.setItem('user',JSON.stringify(res.data));
                }

                })
                .catch((error) => {
                console.error(error)
                });

    };
    
    return (
        <div className="login">
            {props.user && <Navigate to="/" />}
            <form onSubmit={handleSubmit}>
                {loginMassage && <h2>{loginMassage}</h2>}
                <input type="text" name='username' placeholder="User Name"  value={formData.username}  onChange={handleImputChange} />
                <input type="password" name='password' placeholder="Haslo" value={formData.password} onChange={handleImputChange} />
                <button className="btn">Login</button>

            </form>

        </div>
    );
}
export default Login;