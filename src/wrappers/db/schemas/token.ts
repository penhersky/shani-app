const tokenTable = `
CREATE TABLE IF NOT EXISTS tokens (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  token     STRING,
  expiresIn INTEGER,
  type      STRING  UNIQUE
                    NOT NULL
);
`;

const insertToken = (token: string, type: string, expiresIn: string) => {
  return `
  INSERT INTO tokens (
    token,
    ${expiresIn && 'expiresIn,'}
    type
  )
  VALUES (
    '${token}',
    ${expiresIn && `${expiresIn},`}
    '${type}'
  );

  `;
};

const deleteByType = (type: string) =>
  `DELETE FROM tokens WHERE type = '${type}';`;

export default {
  deleteByType,
  insertToken,
  tokenTable,
};
