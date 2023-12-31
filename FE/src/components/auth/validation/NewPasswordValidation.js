const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Pole wymagane'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Błędny adres e-mail'
  }

  return errors
}

export default validate
