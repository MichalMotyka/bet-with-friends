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
    setLoginError(null)
    try {
      // Wysyłanie danych do backendu
      const response = await fetch('http://130.162.44.103:5000/api/v1/login', {
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
            name: '',
            password: ''
          }
        })
           
        // Wyczyszczenie błędu po udanym logowaniu
        setLoginError(null)
      } else {
        // Obsługa błędów, np. wyświetlenie komunikatu użytkownikowi

        // Spróbuj sparsować błąd jako JSON, jeśli to możliwe
        const errorData = await response.json()

        if (errorData.code === 'L1') {
          throw new Error(`Błędne hasło lub nazwa użytkownika.`)
        } else {
          throw new Error(`Przed logowaniem aktywuj swoje konto.`)
        }
      }
    } catch (error) {
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
            name: '',
            password: ''
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form className='form-login'>
              <p className='form-parag'>Zaloguj się i dołącz do zabawy!</p>
              <label htmlFor='name'>Nazwa użytkownika</label>
              <Field
                type='text'
                id='name'
                name='name'
                maxLength={30}
                placeholder='Nazwa użytkownika'
                className={
                  formik.touched.name && formik.errors.name
                    ? 'login-input-error'
                    : ''
                }
              />
              <ErrorMessage
                name='name'
                component='span'
                className='login-error-msg'
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
                className='login-error-msg'
              />

              <button
                className='login-submit-button'
                type='submit'
                disabled={!(formik.dirty && formik.isValid)}
              >
                Zaloguj
              </button>

              {loginError && (
                <div className='login-server-error-msg'>{loginError}</div>
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
