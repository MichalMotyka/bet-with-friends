import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/LogInValidations'
import RaccoonLogin from './images/raccoon-login3.webp'
import { ScrollToTop } from '../../utilities/ScrollToTop'
import './login.css'

function Login () {
  const [loginError, setLoginError] = useState(null)

  const handleSubmit = async (userData, { resetForm }) => {
    try {
      // Wysyłanie danych do backendu
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log('Response from server:', responseData)

        // Czyszczenie formularza po udanym logowaniu
        resetForm({
          values: {
            email: '',
            password: ''
          }
        })

        // Wyczyszczenie błędu po udanym logowaniu
        setLoginError(null)
      } else {
        // Obsługa błędów, np. wyświetlenie komunikatu użytkownikowi
        throw new Error('Wystąpił błąd podczas logowania.')
      }
    } catch (error) {
      console.error('Error sending data to server:', error)

      // Ustawienie błędu, który zostanie wyświetlony użytkownikowi
      setLoginError(error.message || 'Wystąpił błąd podczas logowania.')
    }
  }

  return (
    <section className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>
          Log <span className='span-brand'>in</span>
        </h2>

        <link rel='preload' as='image' href={RaccoonLogin} />
        <img
          className='raccon-login-img'
          src={RaccoonLogin}
          alt=''
          width={250}
          height={250}
        />

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form className='form-login'>
              <p className='form-parag'>Zaloguj się i dołącz do zabawy!</p>
              <label htmlFor='email'>Email</label>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                className={
                  formik.touched.email && formik.errors.email
                    ? 'login-input-error'
                    : ''
                }
              />
              <ErrorMessage
                name='email'
                component='span'
                className='signup-error-msg'
              />

              <label htmlFor='password'>Hasło</label>
              <Field
                type='password'
                id='password'
                name='password'
                placeholder='*********'
              />
              <ErrorMessage
                name='password'
                component='span'
                className='signup-error-msg'
              />

              <button
                className='login-submit-button'
                type='submit'
                disabled={!(formik.dirty && formik.isValid)}
              >
                Zaloguj
              </button>

              {loginError && (
                <div className='login-error-msg'>{loginError}</div>
              )}
            </Form>
          )}
        </Formik>

        <div className='form-to-signup'>
          Nie posiadasz konta?
          <Link to='/signup' className='signup-login' onClick={ScrollToTop}>
            Zarejestruj się
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Login
