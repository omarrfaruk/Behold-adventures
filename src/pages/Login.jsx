import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBValidation, MDBInput, MDBSpinner, MDBCardFooter, MDBValidationItem } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { login, googleSignIn } from '../redux/features/authSlice';
import GoogleLogin from "react-google-login";




const initialState = {
    email: '',
    password: ''
}

const Login = () => {

    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({ formValue, navigate, toast }));
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const googleSuccess = (resp) => {
        console.log(resp)
        const email = resp?.profileObj?.email;
        const name = resp?.profileObj?.name;
        const token = resp?.tokenId;
        const googleId = resp?.googleId;
        const result = { email, name, token, googleId };
        dispatch(googleSignIn({ result, navigate, toast }));
    };
    const googleFailure = (error) => {
        console.log(error)
        toast.error(error);
    };

    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignContent: "center",
                marginTop: "120px",
            }}
        >
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <MDBValidationItem invalid feedback='Please provide your Email' className="col-md-12">
                            <MDBInput
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                        <MDBValidationItem feedback='Please Provide your Password' invalid className="col-md-12">
                            <MDBInput
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">
                                {loading && (
                                    <MDBSpinner
                                        size='sm'
                                        role='status'
                                        tag='span'
                                        className='me-2'
                                    />

                                )}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <br />
                    <GoogleLogin
                        clientId="589410029376-cvjn2o8c2m2tp207c2u527cckq1ij2a9.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <MDBBtn
                                style={{ width: "100%" }}
                                color="danger"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                            </MDBBtn>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                </MDBCardBody>
                <MDBCardFooter >
                    <Link to="/register">
                        <p>Don't have an account ? Sign Up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
};

export default Login;