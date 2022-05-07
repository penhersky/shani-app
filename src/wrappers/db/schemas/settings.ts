const table = `
CREATE TABLE IF NOT EXISTS settings (
  id      INTEGER PRIMARY KEY AUTOINCREMENT
                  NOT NULL,
  [group] STRING,
  [key]   STRING  NOT NULL,
  value   STRING,
  user    STRING  NOT NULL
);
`;

const insert = (user: string, group: string, key: string, value?: string) => {
  return `
  INSERT INTO settings (
    [group],
    [key],
    value,
    user
 )
VALUES (
     '${group}',
     '${key}',
     '${value}',
     '${user}'
 );
  `;
};
const select = (user: string) =>
  `SELECT id, [group], key, value, user FROM settings WHERE user = '${user}';`;

const deleteOne = (user: string, group: string, key: string) =>
  `DELETE FROM settings
  WHERE [group] = '${group}' AND 
        [key] = '${key}' AND 
        user = '${user}';
`;

export default {
  deleteOne,
  insert,
  select,
  table,
};
