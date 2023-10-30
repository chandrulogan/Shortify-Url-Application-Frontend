import React from 'react'
import { Form, Formik, Field } from 'formik'
import validator from 'validator'
import { Link, useNavigate } from 'react-router-dom'
import Shortify from '../../../Assets/Shortify.svg'
import { userUpdatePassword } from '../../../Api/LogIn'
import { getSavedEmail } from '../../../Utils/LocalStorage'

const NewPassword = () => {
    const navigate = useNavigate()
    const savedEmail = getSavedEmail();

    const initialValues = {
        email: savedEmail,
        password:"",
        confirmPassword:""
    }

    const validateForm = (values) => {
        const errors = {};
        if (!values.password) {
            errors.password = "Password is required";
        } else if (!validator.isStrongPassword(values.password)) {
            errors.password = "Password must contain one capital letter, small letter, number, and special symbol";
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "confirmPassword is required";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password dose not match";
        }

        return errors;
    };

    const submitHandler = (Values) => {
        userUpdatePassword(Values).then((res)=>{
            console.log(res);
            navigate('/shortify/dashboard')
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='container container-fluid'>
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <Formik
                        initialValues={initialValues}
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
                                    <label htmlFor='password'>New Password</label>
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
                                <div className='form-group mt-4'>
                                    <label htmlFor='confirmPassword'>Confirm New Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="confirmPassword"
                                        className={formik.touched.confirmPassword && formik.errors.confirmPassword
                                            ? "form-control is-invalid" : "form-control"
                                        }
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div className='invalid-feedback'>{formik.errors.confirmPassword}</div>) : null
                                    }
                                </div>

                                <div className='form-group'>
                                    <button type='submit' className='btn btn-primary py-3 mt-4 w-100'>Update Password and Login</button>
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

export default NewPassword