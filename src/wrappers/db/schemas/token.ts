const table = `
CREATE TABLE IF NOT EXISTS tokens (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  token     STRING,
  expiresIn INTEGER,
  type      STRING  UNIQUE
                    NOT NULL
);
`;

const insert = (token: string, type: string, expiresIn?: string) => {
  return `
  INSERT INTO tokens (
    token,
    ${expiresIn ? 'expiresIn,' : ''}
    type
  )
  VALUES (
    '${token}',
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
  FROM tokens;
`;

const deleteByType = (type: string) =>
  `DELETE FROM tokens WHERE type = '${type}';`;

export default {
  deleteByType,
  insert,
  select,
  table,
};
