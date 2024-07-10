export const validateEmailInput = (email) => {
  const emailPattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  
  return (emailPattern.test(email));
}


export const validateLoginInput = (input) => {

  const { email, password } = input;
  let validatedInput = { email, password };

  if (!email.value) {
    validatedInput.error = true;

    validatedInput.email = {
      ...email,
      error: true,
      message: 'Email is Required'
    }
  }

  if (!password.value) {
    validatedInput.error = true;

    validatedInput.password = {
      ...password,
      error: true,
      message: 'Password is Required'
    }
  }

  if (email.value && !validateEmailInput(email.value)) {
    validatedInput.error = true;
    validatedInput.email = {
      ...email,
      error: true,
      message: 'Please Provide a valid email'
    }
  }

  return validatedInput;
  
}

export const capitalizeInitials = (first_name, last_name) => {  
  return `${first_name[0].toUpperCase()}${last_name[0].toUpperCase()}`;
}
