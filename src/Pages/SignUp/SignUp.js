import React from 'react'
import { Form, Formik, Field } from 'formik'
import validator from 'validator'
import { Link, useNavigate } from 'react-router-dom'
import Shortify from '../../Assets/Shortify.svg'
import { userSignUp } from '../../Api/LogIn'
import { saveToken } from '../../Utils/LocalStorage'


const SignUp = () => {
    const navigate = useNavigate()
    const validateForm = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Name is required";
        } else if (values.name.length > 15) {
            errors.name = "Must be 15 characters or less";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!validator.isEmail(values.email)) {
            errors.email = "Invalid Email";
        }

        if (!values.phoneNo) {
            errors.phoneNo = "Phone No is required";
        } else if (!validator.isMobilePhone(values.phoneNo, 'en-IN')) {
            errors.phoneNo = "Invalid Phone Number";
        }

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

    const submitHandler = (values) => {
        console.log("Form Values:",values);
            userSignUp(values).then(res=>{
            console.log(res);
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
            navigate('/shortify/dashboard')
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className='container container-fluid'>
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phoneNo: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validate={validateForm}
                        onSubmit={submitHandler}
                    >
                        {(formik) => (
                            <Form className="shadow-lg">
                                <h2 className="mb-2 d-flex justify-content-center">
                                    <div className="Header-logo-container">
                                        <img src={Shortify} alt="" />
                                    </div>
                                </h2>
                                <div className="form-group mt-4">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className={
                                            formik.touched.name && formik.errors.name
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="invalid-feedback">{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className={
                                            formik.touched.email && formik.errors.email
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor="phoneNo">Phone No</label>
                                    <Field
                                        name="phoneNo"
                                        type="text"
                                        className={
                                            formik.touched.phoneNo && formik.errors.phoneNo
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                    />
                                    {formik.touched.phoneNo && formik.errors.phoneNo ? (
                                        <div className="invalid-feedback">{formik.errors.phoneNo}</div>
                                    ) : null}
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={
                                            formik.touched.password && formik.errors.password
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="invalid-feedback">{formik.errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className={
                                            formik.touched.confirmPassword && formik.errors.confirmPassword
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary py-3 mt-4 w-100">Sign Up</button>
                                </div>
                                <br></br>
                                <Link to="/">Back</Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default SignUp