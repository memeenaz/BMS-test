import { useEffect } from 'react';
import {Form, Input, Button, Radio, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../apicalls/users';


const Register = () => {
    const navigate = useNavigate();
    const onFinish = async (data) => {
        try{
            const res = await RegisterUser(data);
            if(res.success){
                message.success(res.message);
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
    });

    return (
        <>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Register to BookMyShow</h1>
                    </section>
                    <section className="right-section">
                        <Form layout='vertical' onFinish={onFinish}>
                            <Form.Item label="Name" htmlFor='name' name="name" className='d-block' rules={[{required: true, message: "Name is required!"}]}>
                                <Input id="name" type="text" placeholder='Enter your name'></Input>
                            </Form.Item>
                            <Form.Item label="Email" htmlFor='email' name="email" className='d-block' rules={[{required: true, message: "Email is required!"}]}>
                                <Input id="email" type="email" placeholder='Enter your email'></Input>
                            </Form.Item>
                            <Form.Item  label="Password" htmlFor='password' name="password" className='d-block' rules={[{required: true, message: "Password is required!"}]}>
                                <Input id="password" type="password" placeholder='Enter the password'></Input>
                            </Form.Item>
                            <Form.Item  label="Are you an Admin user?" htmlFor='isAdmin' name="isAdmin" className='d-block text-center'>
                                <div className='d-flex justify-content-start'>
                                    <Radio.Group name="radiogroup" className='flex-start' defaultValue={false}>
                                        <Radio value={true}>Yes</Radio>
                                        <Radio value={false}>No</Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                            
                            <Form.Item>
                                <Button block type="primary" htmlType='submit' style={{fontSize: "1rem", fontWeight: "600"}}>Sign Up</Button>
                            </Form.Item>
                        </Form>
                        <div>
                            <p>Already a user? <Link to="/login">Login now</Link></p>
                        </div>
                    </section>
                </main>
            </header>
        </>
    );
}

export default Register;