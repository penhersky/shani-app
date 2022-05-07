const table = `CREATE TABLE IF NOT EXISTS notifications (
  id       INTEGER PRIMARY KEY AUTOINCREMENT
  UNIQUE,
  title    STRING  NOT NULL,
  subtitle TEXT,
  time     BIGINT,
  image    STRING,
  revised  BOOLEAN DEFAULT (true),
  hidden   BOOLEAN DEFAULT (false),
  user     TEXT
);
`;

const newCount = `SELECT revised, COUNT(*) 
FROM notifications 
WHERE revised = false;`;

const revisedAll = 'UPDATE notifications SET revised = false;';

const insert = (
  user: string,
  title: string,
  time: string,
  subTitle?: string,
  image?: string,
) => {
  return `
  INSERT INTO notifications (
    title,
    subtitle,
    time,
    image,
    revised,
    hidden,
    user
)
VALUES (
    '${title}',
    '${subTitle}',
    '${image}',
    '${time}',
    false,
    false,
    '${user}'
);
  `;
};

const select = (page: number) => `
SELECT id,
    title,
    subtitle,
    time,
    image,
    revised,
    hidden,
    user
  FROM notifications
  ORDER BY id DESC
  LIMIT 20 OFFSET ${20 * (page - 1)};
`;

export default {
  table,
  select,
  insert,
  newCount,
  revisedAll,
};
