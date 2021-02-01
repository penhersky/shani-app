export default {
  en: {
    error: 'The data is not correct',
    errors: {
      shortPass: 'The password must not be shorter than 6 characters',
      passPattern:
        'The password must consist of uppercase and lowercase characters of the Latin alphabet, numbers and symbols',
      email: 'Not a valid email',
      userExist: 'Such a user already exists',
      shortName: 'The name must be at least three characters long',
      namePattern:
        'The name can contain Cyrillic or Latin letters, numbers and symbols "-" "_".',
    },
    password: 'password',
    email: 'Email',
    name: 'Name',
    login: 'Login',
    SingUpTitle: (type: string) =>
      `Sing Up ${type === 'customer' ? 'Employer' : 'Employee'}`,
    SingUp: 'Sing Up',
  },
  ua: {
    error: 'Дані введенні не клректно',
    errors: {
      shortPass: 'Пародь не повинен бути корочший 6 символів',
      passPattern:
        'Пароль повинен складатися із великих та малих символів латинського алфавіту, цифр та символів',
      email: 'Некоректний email',
      userExist: 'Такий користувач уже існує',
      shortName: "Ім'я має містити принаймні три символи",
      namePattern:
        'Ім`я може містити кириличні або латинські літери, цифри та символи "-"  "_"',
    },
    password: 'Пароль',
    email: 'Email',
    name: "Iм'я",
    login: 'Увійти',
    SingUpTitle: (type: string) =>
      `Зареєстрація ${type === 'customer' ? 'роботодавеця' : 'працівника'}`,
    SingUp: 'Зареєструватися',
  },
  ru: {
    error: 'Данные введении не клректно',
    errors: {
      shortPass: 'The password must not be shorter than 6 characters',
      passPattern:
        'Пароль должен состоять из больших и малых символов латинского алфавита, цифр и символов',
      email: 'Некорректный email',
      userExist: 'Такой пользователь уже существует',
      shortName: 'Имя должно состоять не менее чем из трех символов',
      namePattern:
        'Имя может содержать кириллические или латинские буквы, цифры и символы "-" "_".',
    },
    password: 'Пароль',
    email: 'Email',
    name: 'Имя',
    login: 'Войти',
    SingUpTitle: (type: string) =>
      `Sing Up ${type === 'customer' ? 'работодателиля' : 'работника'}`,
    SingUp: 'Зарегистрироваться',
  },
};
