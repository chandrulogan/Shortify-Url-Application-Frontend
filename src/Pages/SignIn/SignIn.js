import React from 'react'
import './SignIn.css'
import { Form, Formik, Field } from 'formik'
import validator from 'validator'
import { Link, useNavigate } from 'react-router-dom'
import Shortify from '../../Assets/Shortify.svg'
import { userSignIn } from '../../Api/LogIn'
import { saveToken } from '../../Utils/LocalStorage'


const SignIn = () => {
    const navigate = useNavigate()
    const validateForm = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!validator.isEmail(values.email)) {
            errors.email = "Invalid Email";
        }

        if (!values.password) {
            errors.password = "Password is required";
        }

        return errors;
    };

    const submitHandler = (values) => {
        console.log("Form Values:", values);
        userSignIn(values)
            .then((res) => {
                console.log(res.data);
                let token = res?.data?.token
                let email = res?.data?.user?.email
                let name = res?.data?.user?.name
                let _id = res?.data?.user?._id

                let data = {
                    token: token, 
                    email: email, 
                    name: name, 
                    _id: _id
                }
                saveToken(data)
                if (res.status === 200) {
                    navigate('/shortify/dashboard');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='container container-fluid'>
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validate={validateForm}
                        onSubmit={submitHandler}
                    >
                        {(formik) => (
                            <Form className='shadow-lg'>
                                <h2 className='mb-2 d-flex justify-content-center'>

                                    <div className='Header-logo-container'>
                                        <img
                                            src={Shortify}
                                            alt=''
                                        />
                                    </div>
                                </h2>
                                <div className='form-group mt-4'>
                                    <label htmlFor='email'>Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className={formik.touched.email && formik.errors.email
                                            ? "form-control is-invalid" : "form-control"
                                        }
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='invalid-feedback'>{formik.errors.email}</div>) : null
                                    }
                                </div>
                                <div className='form-group mt-4'>
                                    <label htmlFor='password'>Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={formik.touched.password && formik.errors.password
                                            ? "form-control is-invalid" : "form-control"
                                        }
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='invalid-feedback'>{formik.errors.password}</div>) : null
                                    }
                                </div>
                                <br></br>
                                <Link to={`/shortify/reset-password`} className='form-fp'>Forgot Password?</Link>
                                <div className='form-group'>
                                    <button type='submit' className='btn btn-primary py-3 mt-4 w-100' onClick={submitHandler}>LogIn</button>
                                </div>
                                <br></br>
                                <Link to={`/shortify/sign-up`} className='form-su'>SignUp</Link>
                                <Link to={`/project-Info`} target='_blank'>Project Info</Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default SignIn