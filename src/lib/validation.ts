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
  return;
};

const name = (Name: string) => {
  if (Name.length < 3) {
    return 'len';
  }
  if (!new RegExp(/^[А-ЯЄЇа-яєїa-zA-Z0-9_-]*$/).test(Name)) {
    return 'pattern';
  }
  return;
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
  return;
};

export default {
  email: emailValid,
  name,
  password,
};
