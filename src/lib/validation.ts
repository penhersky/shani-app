const emailValid = (email: string) => {
  if (email.length < 5) {
    return 'len';
  }
  if (
    !new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ).test(email)
  ) {
    return 'pattern';
  }
  return undefined;
};

const password = (pass: string) => {
  if (pass.length < 6) {
    return 'len';
  }
  if (
    !new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$',
    ).test(pass)
  ) {
    return 'pattern';
  }
  return undefined;
};

export default {
  email: emailValid,
  password,
};
