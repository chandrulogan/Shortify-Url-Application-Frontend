import React from 'react'
import { Form, Formik, Field } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import Shortify from '../../../Assets/Shortify.svg'
import { userVerifyOtp } from '../../../Api/LogIn'
import { getSavedEmail } from '../../../Utils/LocalStorage'

const VerifyOtp = () => {
    const navigate = useNavigate();
    const savedEmail = getSavedEmail();

    const initialValues = {
        email: savedEmail,
        verificationOTP: ""
    };

    const validateForm = (values) => {
        const errors = {};

        if (!values.verificationOTP) {
            errors.verificationOTP = "Otp is required";
        }
        return errors;
    };

    const submitHandler = (values) => {
        console.log("Form Values:", values);

        userVerifyOtp(values).then((res) => {
            console.log(res);
            if (res.status === 200) {
                navigate('/shortify/reset-password/new-password');
            }
        }).catch((err) => {
            console.log(err);
        });
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
                                    <label htmlFor='verificationOTP'>Verify Otp</label>
                                    <Field
                                        name="verificationOTP"
                                        type="number"
                                        className={formik.touched.verificationOTP && formik.errors.verificationOTP
                                            ? "form-control is-invalid" : "form-control"
                                        }
                                    />
                                    {formik.touched.verificationOTP && formik.errors.verificationOTP ? (
                                        <div className='invalid-feedback'>{formik.errors.verificationOTP}</div>) : null
                                    }
                                </div>
                                <div className='form-group'>
                                    <button type='submit' className='btn btn-primary py-3 mt-4 w-100'>Verify Otp</button>
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

export default VerifyOtp;
