import React from 'react'
import { Form, Formik, Field } from 'formik'
import validator from 'validator'
import { Link, useNavigate } from 'react-router-dom'
import Shortify from '../../Assets/Shortify.svg'
import { userForgotPassword } from '../../Api/LogIn'
import { saveEmail } from '../../Utils/LocalStorage'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const validateForm = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!validator.isEmail(values.email)) {
            errors.email = "Invalid Email";
        }

        return errors;
    };

    const submitHandler = (values) => {
        console.log("Form Values:", values);
        userForgotPassword(values).then((res) => {
            console.log(res.data.email);
            var email = res.data.email
            saveEmail(email)
            if (res.status === 200) {
                navigate('/shortify/reset-password/verify-otp')   
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className='container container-fluid'>
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <Formik
                        initialValues={{email: "" }}
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
                                <div className='form-group'>
                                    <button type='submit' className='btn btn-primary py-3 mt-4 w-100'>Send Otp</button>
                                </div>
                                <br></br>
                                <Link to={`/`} className='form-su'>Back</Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword