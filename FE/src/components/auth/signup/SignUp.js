import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/SignUpValidation'
function SignUp () {
  const handleSubmit = async (userData, { resetForm }) => {
    try {
      console.log(userData)
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
      } else {
        // Obsługa błędów, np. wyświetlenie komunikatu użytkownikowi
        console.error('Error sending data to server:', response.statusText)
      }
    } catch (error) {
      // Obsługa błędów, np. wyświetlenie komunikatu użytkownikowi
      console.error('Error sending data to server:', error)
    }
  }

  return (
    <section className='app-wrap'>
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
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <h2>Sign Up</h2>

            <label htmlFor='username'>Nickname</label>
            <Field
              type='text'
              id='username'
              name='username'
              placeholder='Nickname'
            />
            <ErrorMessage name='username' component='div' />

            <label htmlFor='password'>Hasło</label>
            <Field
              type='password'
              id='password'
              name='password'
              placeholder='********'
            />
            <ErrorMessage name='password' component='div' />

            <label htmlFor='confirmPassword'>Potwierdź hasło:</label>
            <Field
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              placeholder='********'
            />
            <ErrorMessage name='confirmPassword' component='div' />

            <label htmlFor='email'>Email</label>
            <Field type='email' id='email' name='email' placeholder='Email' />
            <ErrorMessage name='email' component='div' />

            <button type='submit' disabled={!(formik.dirty && formik.isValid)}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default SignUp
