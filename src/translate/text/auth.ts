export default {
  en: {
    error: 'The data is not correct',
    errors: {
      shortPass: 'The password must not be shorter than 6 characters',
      passPattern:
        'The password must consist of uppercase and lowercase characters of the Latin alphabet, numbers and symbols',
      passIdentity: 'Passwords do not match',
      email: 'Not a valid email',
      userExist: 'Such a user already exists',
      shortName: 'The name must be at least three characters long',
      date: 'The minimum registration age is 16 years',
      namePattern:
        'The name can contain Cyrillic or Latin letters, numbers and symbols "-" "_".',
      code: 'Incorrect code',
    },
    password: 'password',
    repassword: 'Repeat the password',
    email: 'Email',
    name: 'Name',
    login: 'Login',
    SingUpTitle: (type: string) =>
      `Sing Up ${type === 'customer' ? 'Employer' : 'Employee'}`,
    codeTitle: 'Enter the verification code we sent to your email address',
    passTitle: 'Enter your password',
    SingUp: 'Sing Up',
  },
  ua: {
    error: 'Дані введенні не клректно',
    errors: {
      shortPass: 'Пародь не повинен бути корочший 6 символів',
      passPattern:
        'Пароль повинен складатися із великих та малих символів латинського алфавіту, цифр та символів',
      passIdentity: 'Паролі не збігаються',
      email: 'Некоректний email',
      userExist: 'Такий користувач уже існує',
      shortName: "Ім'я має містити принаймні три символи",
      date: 'Мінімальний вік реєстрації 16 років',
      namePattern:
        'Ім`я може містити кириличні або латинські літери, цифри та символи "-"  "_"',
      code: 'Некоректний код',
    },
    password: 'Пароль',
    repassword: 'Повторіть пароль',
    email: 'Email',
    name: "Iм'я",
    login: 'Увійти',
    SingUpTitle: (type: string) =>
      `Зареєстрація ${type === 'customer' ? 'роботодавеця' : 'працівника'}`,
    codeTitle:
      'Введіть код підтвердження, який ми надіслали на вашу електронну адресу',
    passTitle: 'Введіть ваш пароль',
    SingUp: 'Зареєструватися',
  },
  ru: {
    error: 'Данные введении не клректно',
    errors: {
      shortPass: 'The password must not be shorter than 6 characters',
      passPattern:
        'Пароль должен состоять из больших и малых символов латинского алфавита, цифр и символов',
      passIdentity: 'Пароли не совпадают',
      email: 'Некорректный email',
      userExist: 'Такой пользователь уже существует',
      shortName: 'Имя должно состоять не менее чем из трех символов',
      date: 'Минимальный возраст для регистрации 16 лет',
      namePattern:
        'Имя может содержать кириллические или латинские буквы, цифры и символы "-" "_".',
      code: 'Некорректный код',
    },
    password: 'Пароль',
    repassword: 'Повторите пароль',
    email: 'Email',
    name: 'Имя',
    login: 'Войти',
    SingUpTitle: (type: string) =>
      `Sing Up ${type === 'customer' ? 'работодателиля' : 'работника'}`,
    codeTitle:
      'Введите код подтверждения, который мы направили на ваш электронный адрес',
    passTitle: 'Введите свой пароль',
    SingUp: 'Зарегистрироваться',
  },
};
