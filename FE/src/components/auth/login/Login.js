import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/LogInValidations'
import RaccoonLogin from './images/raccoon-login3.webp'
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

      // Sprawdzenie, czy odpowiedź jest udana
      if (response.ok) {
        const responseData = await response.json()
        console.log('Response from server:', responseData)

        // Resetowanie formularza po udanym logowaniu
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
        const errorData = await response.json() // Zakładam, że serwer zwraca JSON
        console.error('Error sending data to server:', errorData)

        // Ustawienie błędu, który zostanie wyświetlony użytkownikowi
        setLoginError(errorData.message || 'Wystąpił błąd podczas logowania.')
      }
    } catch (error) {
      // Obsługa błędów, np. wyświetlenie komunikatu użytkownikowi
      console.error('Error sending data to server:', error)

      // Ustawienie błędu, który zostanie wyświetlony użytkownikowi
      setLoginError('Wystąpił błąd podczas logowania.')
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
                Submit
              </button>

              {loginError && (
                <div className='login-error-msg'>{loginError}</div>
              )}
            </Form>
          )}
        </Formik>

        <div className='form-to-signup'>
          Nie posiadasz konta?
          <Link to='/signup' className='signup-login'>
            Zarejestruj się
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Login
