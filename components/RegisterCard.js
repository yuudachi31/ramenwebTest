import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { registerToFirebase, createBookMarker } from '../actions'
import { StoreContext } from "../store"

const RegisterCard = ({ onReturnLogin }) => {
    const { state: { userRegister: { userInfo, loading, error } }, dispatch } = useContext(StoreContext);
    const [form] = Form.useForm();
    const router = useRouter()
   
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        await registerToFirebase(dispatch, values);
        await createBookMarker(dispatch);
    };
    
    useEffect(() => {
        if (userInfo) {
            router.push("/profile/myPosts", undefined, { shallow: true });
        }
    }, [userInfo]);// eslint-disable-line react-hooks/exhaustive-deps
  
    return (
        <>
            <div className="login-card-alignment">
                <Form
                    name="register"
                    className="login-form"
                    form={form}
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <div className="login-title">
                        <img 
                            src="/images/login-title.png"
                            className="login-title-img"
                            alt="ramen"    
                        />
                    </div>
                    <Form.Item
                    className="register-username"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input 
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        className="login-email"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        className="login-password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item className="login-register">
                        <div className="register-has-account" onClick={onReturnLogin}>已經有帳號了</div>
                    </Form.Item>
                    <Form.Item className="login-login" >
                        {loading ? (
                        <Button
                            type="primary"
                            className="login-form__button"
                            htmlType="submit"
                            loading
                        >
                            <span className="login-form__button-span">註冊</span>
                        </Button>
                        ) : (
                        <Button
                            type="primary"
                            className="login-form__button"
                            htmlType="submit"
                        >
                            <span className="login-form__button-span">註冊</span>
                        </Button>
                        )}
                        {error === "" ? (
                            <></>
                        ) : (
                        <div className="login-form__error-wrap">
                            <h3 className="login-form__error-title">
                                There was a problem
                            </h3>
                            <p className="login-form__error-message">{error}</p>
                        </div>
                        )}
                    </Form.Item>
                </Form>
            </div>
        
        </>
    );
};
export default RegisterCard;