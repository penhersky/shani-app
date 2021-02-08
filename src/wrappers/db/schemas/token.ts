const table = `
CREATE TABLE IF NOT EXISTS tokens (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  token     STRING,
  user      STRING,
  active    Boolean,
  expiresIn INTEGER,
  type      STRING  UNIQUE
                    NOT NULL
);
`;

const insert = (
  user: string,
  token: string,
  type: string,
  expiresIn?: string,
) => {
  return `
  INSERT INTO tokens (
    token,
    user,
    active,
    ${expiresIn ? 'expiresIn,' : ''}
    type
  )
  VALUES (
    '${token}',
    '${user}',
    true,
    ${expiresIn ? `${expiresIn},` : ''}
    '${type}'
  );

  `;
};
const select = `
  SELECT id,
      token,
      expiresIn,
      type
  FROM tokens WHERE active = true;
`;

const deleteByType = (type: string, user: string) =>
  `DELETE FROM tokens WHERE type = '${type}' AND user = '${user}';`;

const deleteByUser = (user: string) =>
  `DELETE FROM tokens WHERE user = '${user}';`;

export default {
  deleteByType,
  deleteByUser,
  insert,
  select,
  table,
};
