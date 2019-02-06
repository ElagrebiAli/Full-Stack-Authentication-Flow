import React from 'react'
import {withFormik,Form,Field} from 'formik'
import * as Yup from 'yup'
import pick from 'lodash/pick'

import MaterialInput from './FormikTextField'

const FormikApp=(props)=>{
    const { isSubmitting,values:{isSignup,errorMessage}} = props
    return(
        <div className="wrapper">
        <Form>
           <div className="form-group">
             <Field name="email" type="email" label="Email" className="form-control"  component={MaterialInput}/>
               <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
           </div>
           <div className="form-group">
              <Field name="password" type="password" label="Enter Password" className="form-control" component={MaterialInput}/>
            </div>
            {isSignup?<div className="form-group">
               <Field name="confirmPassword" type="password" label="Re-Enter Password" className="form-control" component={MaterialInput} />
            </div>:null}
            {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:null}
             <button type="submit" className="btn btn-primary btn-lg gradient" disabled={isSubmitting}>Submit</button>
     </Form>
     </div>
     
    )
}
const FormikForm=withFormik({
    enableReinitialize: true,
    validationSchema:({isSignup})=>{return Yup.object().shape(Object.assign({
        email: Yup.string()
                     .email('Invalid email')
                     .required('Required'),
        password: Yup.string()
                     .min(6, 'Too Short!')
                     .max(10, 'Too long!')
                     .matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W])/,'Password is not valid')
                     .required('Required')}
                     ,isSignup?{
        confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], "Passwords don't match")
                    .required('Confirm Password is required')}:{})
    )},
    mapPropsToValues:({isSignup,errorMessage})=>(Object.assign({email:"",password:"",isSignup,errorMessage/*you can put a default value in each of your input here*/ },isSignup?{confirmPassword:""}:null)),
    handleSubmit: async (values, { props,setSubmitting }) => {
           await props.onSubmit(pick(values,['email','password']))
          setSubmitting(false)
        },
    displayName: 'BasicForm',
})(FormikApp)

export default FormikForm