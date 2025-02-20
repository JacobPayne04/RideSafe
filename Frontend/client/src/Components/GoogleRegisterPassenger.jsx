import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
 
 
const GoogleRegisterPassenger = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, googleId } = location.state || {};
    const passengerId = typeof window !== 'undefined' ? localStorage.getItem("passengerId") : null;

    const formik = useFormik({
        initialValues: {
            firstName : '',
            lastName : '',
            email : email,
            googleId : googleId,
            Password : null,
            confirmPassword : null,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required')
        }),

        onSubmit: (values) => {
            const data = {...values, email, googleId};

            axios.post("http://localhost:8080/passenger/new", data)
                .then(()=> {
                navigate(`/passenger/home/${passengerId}`);
                })
                .catch((error)=> console.error('There was an error!', error))

        },
    });

//#TODO add prefilled fields.
    return (
        <form onSubmit={formik.handleSubmit}>
          <h2>Complete Google Sign-Up</h2>

          <input name="firstName" placeholder="First Name" value={formik.values.firstName}
            onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.firstName && formik.errors.firstName && <div>{formik.errors.firstName}</div>}
          
          <input name="lastName" placeholder="Last Name" value={formik.values.lastName}
            onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.lastName && formik.errors.lastName && <div>{formik.errors.lastName}</div>}
        
          <p>Email: <strong>{email}</strong></p>
          <input name="email" placeholder="email" value={formik.values.email}
            onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

          <input name="googleId" placeholder="googleId" value={formik.values.googleId}
            onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.googleId && formik.errors.googleId && <div>{formik.errors.googleId}</div>}
          
          
          
          <button type="submit">Complete Sign-Up</button>
        </form>
      );
    };

export default GoogleRegisterPassenger