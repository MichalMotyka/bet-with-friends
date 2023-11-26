const validate = values => {
  const errors = {}

  if (!values.username) {
    errors.username = 'Pole wymagane'
  } else if (values.username.length < 3 || values.username.length >= 30) {
    errors.username = 'Nick musi mieć od 3 do 30 znaków'
  }

  if (values.password.length < 8) {
    errors.password = 'Hasło musi mieć co najmniej 8 znaków'
  } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
    errors.password = `Hasło musi zawierać co najmniej jeden znak specjalny (!@#$%^&*)`
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Hasła muszą być identyczne'
  }

  if (!values.email) {
    errors.email = 'Pole wymagane'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Błędny adres e-mail'
  }

  return errors
}

export default validate
