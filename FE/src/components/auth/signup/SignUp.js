import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/SignUpValidation'
import RaccoonSignUp from './images/raccoon-signup.webp'
import { ScrollToTop } from '../../utilities/ScrollToTop'
import './signup.css'

function SignUp () {
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (userData, { resetForm }) => {
    try {
      const userDataSending = {
        name: userData.name,
        password: userData.password,
        email: userData.email
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDataSending)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log('Response from server:', responseData)

        resetForm({
          values: {
            name: '',
            password: '',
            confirmPassword: '',
            email: ''
          }
        })
        setFormError([
          'Rejestracja zakończona sukcesem. Możesz się teraz zalogować.'
        ])
      } else {
        const errorData = await response.text()
        console.error('Error sending data to server:', errorData)
        setFormError(errorData.message || 'Wystąpił błąd podczas rejestracji.')
      }
    } catch (error) {
      console.error('Error sending data to server:', error)
      setFormError('Wystąpił błąd podczas rejestracji.')
    }
  }

  return (
    <section className='app-wrap'>
      <div className='signup'>
        <h2 className='section-title'>
          Sign <span className='span-brand'>Up</span>
        </h2>

        <link rel='preload' as='image' href={RaccoonSignUp} />

        <img
          className='raccon-signup-img'
          src={RaccoonSignUp}
          alt=''
          width={250}
          height={250}
        />

        <Formik
          initialValues={{
            name: '',
            password: '',
            confirmPassword: '',
            email: ''
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {/* 
touched:czy dane pole formularza zostało dotknięte przez użytkownika 

errors: Jest to obiekt, który przechowuje błędy dla poszczególnych pól formularza. Jeśli pole jest błędne, to błąd zostanie przechowany w tym obiekcie.

dirty: Jest to flaga mówiąca o tym, czy formularz został zmieniony. Jeśli chociaż jedno pole zostało dotknięte (zmienione), dirty będzie true.

isValid: Jest to flaga mówiąca o tym, czy cały formularz jest aktualnie ważny (czyli czy wszystkie walidacje zwracają pozytywny wynik). Jeśli wszystko jest poprawne, isValid będzie true. */}

          {({ touched, errors, dirty, isValid }) => (
            <Form className='form-signup'>
              <p>Stwórz konto i dołącz do społeczności!</p>

              <label htmlFor='email'>Email</label>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                className={
                  touched.email && errors.email ? 'signup-input-error' : ''
                }
              />
              <ErrorMessage
                name='email'
                component='span'
                className='signup-error-msg'
              />

              <label htmlFor='name'>Nazwa użytkownika</label>
              <Field
                type='text'
                id='name'
                name='name'
                placeholder='Nazwa użytkownika'
                className={
                  touched.name && errors.name ? 'signup-input-error' : ''
                }
              />
              <ErrorMessage
                name='name'
                component='span'
                className='signup-error-msg'
              />

              <label htmlFor='password'>Hasło</label>
              <Field
                type='password'
                id='password'
                name='password'
                placeholder='*********'
                className={
                  touched.password && errors.password
                    ? 'signup-input-error'
                    : ''
                }
              />
              <ErrorMessage
                name='password'
                component='span'
                className='signup-error-msg'
              />

              <label htmlFor='confirmPassword'>Potwierdź hasło</label>
              <Field
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='*********'
                className={
                  touched.confirmPassword && errors.confirmPassword
                    ? 'signup-input-error'
                    : ''
                }
              />
              <ErrorMessage
                name='confirmPassword'
                component='span'
                className='signup-error-msg'
              />

              <button
                type='submit'
                className='signup-submit-button'
                // bez dirty button były enabled, stad koniecznosc interakcji z formularzem.
                disabled={!(dirty && isValid)}
              >
                Submit
              </button>

              {formError && (
                <div className='signup-error-msg '>{formError}</div>
              )}
            </Form>
          )}
        </Formik>

        <div className='form-to-login'>
          Posiadasz już konto?
          <Link to='/login' className='signup-login' onClick={ScrollToTop}>
            Zaloguj się
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SignUp
