import {Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { LoginUser } from '../apicalls/users';
import { useEffect } from 'react';
const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (data) => {
        try{
            const res = await LoginUser(data);
            console.log(res);
            if(res.success){
                message.success(res.message);
                localStorage.setItem("token", res.token);
                // navigate("/");  // navigate is not working here, so need to do it with window.loacation
                window.location.href = "/";
            }else{;
                message.error(res.message)
            }
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate("/");
        }
    }) 

    return (
        <>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Welcome back to BookMyShow</h1>
                    </section>
                    <section className="right-section">
                        <Form layout='vertical' onFinish={onFinish}>
                            <Form.Item label="Email" htmlFor='email' name="email" className='d-block' rules={[{required: true, message: "Email is required!"}]}>
                                <Input id="email" type="text" placeholder='Enter your email' autoComplete='username'></Input>
                            </Form.Item>
                            <Form.Item  label="Password" htmlFor='password' name="password" className='d-block' rules={[{required: true, message: "Password is required!"}]}>
                                <Input id="password" type="password" placeholder='Enter the password' autoComplete='current-password'></Input>
                            </Form.Item>
                            <Form.Item>
                                <Button block type="primary" htmlType='submit' style={{fontSize: "1rem", fontWeight: "600"}}>Login</Button>
                            </Form.Item>
                        </Form>
                        <div>
                            <p>Not registered yet? <Link to="/register">Register now</Link></p>
                        </div>
                    </section>
                </main>
            </header>
        </>
    );
}

export default Login;