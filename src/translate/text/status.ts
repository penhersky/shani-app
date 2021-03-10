const text = {
  en: {
    status: 'Change status',
    statuses: {
      'in processing': 'In the process of execution',
      closed: 'Completed',
      canceled: 'Canceled',
    },
    action: {
      goToDefault: 'To the initial',
      'in processing': 'Get started',
      chosePerformer: 'Choose as a performer',
      refuse: 'Refuse to perform',
      cancelPerformer: 'Cancel Performer',
      done: 'Done',
      close: 'Complete',
      cancel: 'Cancel',
    },
    info: {
      cancelPerformer: (name: string) =>
        `Are you sure you want to cancel ${name} as a task performer?`,
      refuse: 'Are you sure you want to drop the task?',
    },
  },
  ua: {
    status: 'Змінити стаус',
    statuses: {
      'in processing': 'В процесі виконання',
      closed: 'Завершенно',
      canceled: 'Відмінено',
    },
    action: {
      goToDefault: 'До початкового',
      'in processing': 'Розпочати',
      chosePerformer: 'Вибирати як виконавця',
      refuse: 'Відмовитися від виконання',
      cancelPerformer: 'Відмінити виконавця',
      done: 'Готово',
      close: 'Завершити',
      cancel: 'Відмінити',
    },
    info: {
      cancelPerformer: (name: string) =>
        `Ви впевненні що хочете відмінити користувача ${name} як виконавця завдання?`,
      refuse: 'Ви впевнені, що хочете відмовитись від завдання?',
    },
  },
  ru: {
    status: 'Изменить стаус',
    statuses: {
      'in processing': 'В процессе выполнения',
      closed: 'Завершенно',
      canceled: 'Отменен',
    },
    action: {
      goToDefault: 'К начальному',
      'in processing': 'Начать',
      chosePerformer: 'Выбрать в качестве исполнителя',
      refuse: 'Отказаться от исполнения',
      cancelPerformer: 'Oтменить исполнителя',
      done: 'Выполнено',
      close: 'Завершить',
      cancel: 'Отменить',
    },
    info: {
      cancelPerformer: (name: string) =>
        `Вы уверены, что хотите отменить пользователя ${name} as a task performer?`,
      refuse: 'Вы уверены, чкак исполнителя задачи?',
    },
  },
};

export default text;
