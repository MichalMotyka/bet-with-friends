const validate = values => {
  const errors = {}

  if (values.password.length < 8) {
    errors.password = 'Hasło musi mieć co najmniej 8 znaków'
  } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
    errors.password =
      'Hasło musi zawierać co najmniej jeden znak specjalny (!@#$%^&*)'
  }

  if (!values.name) {
    errors.name = 'Pole wymagane'
  } else if (values.name.length < 3 || values.name.length >= 30) {
    errors.name = 'Nick musi mieć od 3 do 30 znaków'
  }

  return errors
}

export default validate
