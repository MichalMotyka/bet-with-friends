import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/SignUpValidation'
import RaccoonSignUp from './images/raccoon-signup.webp'
import './signup.css'

function SignUp () {
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (userData, { resetForm }) => {
    try {
      // Wysyłanie danych do backendu
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      // Sprawdzenie, czy odpowiedź jest udana
      if (response.ok) {
        const responseData = await response.json()
        console.log('Response from server:', responseData)

        // Resetowanie formularza
        resetForm({
          values: {
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
          }
        })
        setFormError([
          'Rejestracja zakończona sukcesem. Możesz się teraz zalogować.'
        ])
      } else {
        // W przypadku błędu, pobierz informacje o błędzie z serwera
        const errorData = await response.text()
        console.error('Error sending data to server:', errorData)

        // Ustaw błąd, który zostanie wyświetlony użytkownikowi
        setFormError(errorData.message || 'Wystąpił błąd podczas rejestracji.')
      }
    } catch (error) {
      // Obsługa błędów, np. wyświetlenie komunikatu użytkownikowi
      console.error('Error sending data to server:', error)
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
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form className='form-signup'>
              <p>Stwórz konto i dołącz do społeczności!</p>

              <label htmlFor='email'>Email</label>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                className={
                  formik.touched.email && formik.errors.email
                    ? 'signup-input-error'
                    : ''
                }
              />
              <ErrorMessage
                name='email'
                component='span'
                className='signup-error-msg'
              />

              <label htmlFor='username'>Nickname</label>
              <Field
                type='text'
                id='username'
                name='username'
                placeholder='Nickname'
                className={
                  formik.touched.username && formik.errors.username
                    ? 'signup-input-error'
                    : ''
                }
              />
              <ErrorMessage
                name='username'
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
                  formik.touched.password && formik.errors.password
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
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
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
                disabled={!(formik.dirty && formik.isValid)}
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
          <Link to='/login' className='signup-login'>
            Zaloguj się
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SignUp
