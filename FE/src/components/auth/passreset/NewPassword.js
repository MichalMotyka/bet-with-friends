import { useState } from 'react'
import MyPassword from './images/mypassword.webp'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/NewPasswordValidation'

function NewPassword () {
  const [successMessage, setSuccessMessage] = useState(null)
  const [serverError, setServerError] = useState(false)

  const handleSubmit = async (userData, { resetForm }) => {
    console.log(userData.email)

    try {
      const response = await fetch('http://localhost:5000/api/v1/reset', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userData.email
        })
      })

      if (response.ok) {
        setServerError(false)
        console.log('POSZŁO!')
        resetForm({
          values: {
            email: ''
          }
        })
        setSuccessMessage(
          'Instrukcja resetowania hasła została wysłana na podany email.'
        )
      } else {
        const errorData = await response.json()
        console.log(errorData)
        setServerError(true)
      }
    } catch (error) {
      setServerError(true)
    }
  }

  return (
    <section className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>
          Przypomnij <span className='span-brand'>hasło</span>
        </h2>

        <img
          src={MyPassword}
          className='raccon-login-img'
          alt=''
          width={250}
          height={250}
        />

        <div>
          <Formik
            initialValues={{
              email: ''
            }}
            validate={validate}
            onSubmit={handleSubmit}
            className='form-login'
          >
            {formik => (
              <Form className='form-login'>
                {' '}
                <label htmlFor='email'>Email</label>
                <Field
                  id='email'
                  name='email'
                  placeholder='Email...'
                  type='email'
                  className={
                    formik.touched.email && formik.errors.email
                      ? 'login-input-error'
                      : ''
                  }
                />
                <ErrorMessage
                  name='email'
                  component='span'
                  className='login-error-msg'
                />
                <button
                  className='login-submit-button'
                  type='submit'
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Submit
                </button>
                {successMessage && (
                  <div className='signup-success-msg'>{successMessage}</div>
                )}
                {serverError && (
                  <p>'W systemie nie ma takiego takiego emaila'</p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  )
}

export default NewPassword
