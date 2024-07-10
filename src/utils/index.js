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
      message: 'Email is required'
    }
  }

  if (!password.value) {
    validatedInput.error = true;

    validatedInput.password = {
      ...password,
      error: true,
      message: 'Password is required'
    }
  }

  if (email.value && !validateEmailInput(email.value)) {
    validatedInput.error = true;
    validatedInput.email = {
      ...email,
      error: true,
      message: 'Please provide a valid email address'
    }
  }

  return validatedInput;
  
}

export const validateSignupInput = (input) => {
  const { first_name, last_name, email, password, confirm_password } = input;

  const validatedInput = {error: false, first_name, last_name, email, password, confirm_password};

  if (!first_name.value) {
    validatedInput.error = true;
    validatedInput.first_name = {
      ...first_name,
      error: true,
      message: 'First name is required'
    }
  }

  if (!last_name.value) {
    validatedInput.error = true;
    validatedInput.last_name = {
      ...last_name,
      error: true,
      message: 'Last name is required'
    }
  }

  if (!email.value) {
    validatedInput.error = true;
    validatedInput.email = {
      ...email,
      error: true,
      message: 'Email is required'
    }
  }

  if (!password.value) {
    validatedInput.error = true;
    validatedInput.password = {
      ...password,
      error: true,
      message: 'Password is required'
    }
  }

  if (!confirm_password.value) {
    validatedInput.error = true;
    validatedInput.confirm_password = {
      ...confirm_password,
      error: true,
      message: 'Confirm password is required'
    }
  }

  if (password.value && (password.value !== confirm_password.value)) {
    validatedInput.error = true;
    validatedInput.confirm_password = {
      ...confirm_password,
      error: true,
      message: 'Passwords don\'t match'
    }
  }

  if (email.value && !validateEmailInput(email.value)) {
    validatedInput.error = true;
    validatedInput.email = {
      ...email,
      error: true,
      message: 'Please provide a valid email address'
    }
  }

  return validatedInput;
}

export const capitalizeInitials = (first_name, last_name) => {  
  return `${first_name[0].toUpperCase()}${last_name[0].toUpperCase()}`;
}
