import React from 'react';
import Header from '../../Components/Header';
import { Form, Formik, Field } from 'formik';
import validator from 'validator';
import { Link, useNavigate } from 'react-router-dom';
import { getuserId } from '../../Utils/LocalStorage';
import { shorternNewUrl } from '../../Api/Url';

const CreateNewUrl = () => {
  const userId = getuserId();
  const navigate = useNavigate();
  const initialValues = {
    userId,
    urlName:"",
    url:""
  }
  const validateForm = (values) => {
    const errors = {};

    if (!values.urlName) {
      errors.urlName = "Url Name is required";
    } else if (values.urlName.length > 15) {
      errors.urlName = "Must be 15 characters or less";
    }

    if (!values.url) {
      errors.url = "Url to be shortened is required";
    } else if (!validator.isURL(values.url)) {
      errors.url = "Invalid URL";
    }

    return errors;
  };

  const submitHandler = (values) => {
    console.log(values);
    shorternNewUrl(values).then((res)=>{
      console.log(res);
      navigate("/shortify/dashboard")
    }).catch((err)=>{
      console.log(err);
    })
  };

  return (
    <div>
      <Header />
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={submitHandler}
          >
            {(formik) => (
              <Form className='shadow-lg'>
                <div className='form-group mt-4'>
                  <label htmlFor='urlName'>Url Name</label>
                  <Field
                    name="urlName"
                    type="text"
                    className={formik.touched.urlName && formik.errors.urlName
                      ? "form-control is-invalid" : "form-control"
                    }
                  />
                  {formik.touched.urlName && formik.errors.urlName ? (
                    <div className='invalid-feedback'>{formik.errors.urlName}</div>
                  ) : null}
                </div>

                <div className='form-group mt-4'>
                  <label htmlFor='url'>Url to be shortened</label>
                  <Field
                    name="url"
                    type="text"
                    className={formik.touched.url && formik.errors.url
                      ? "form-control is-invalid" : "form-control"
                    }
                  />
                  {formik.touched.url && formik.errors.url ? (
                    <div className='invalid-feedback'>{formik.errors.url}</div>
                  ) : null}
                </div>
                <div className='form-group'>
                  <button type='submit' className='btn btn-primary py-3 mt-4 w-100'>Shorten the Url</button>
                </div>
                <br></br>
                <Link to={`/`} className='form-su'>Back</Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateNewUrl;
