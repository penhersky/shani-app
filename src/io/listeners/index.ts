export const newOrder = ({
  order: {id, name, createdAt},
}: {
  order: {id: string; name: string; createdAt: string};
}) => {
  console.log(id, name, createdAt);
};
