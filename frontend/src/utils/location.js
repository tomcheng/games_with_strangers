export const getRoomCodeFromLocation = ({ search }) => {
  const match = search.match(/[?&]c=([A-Z]{4})/);

  if (!match) {
    return null;
  }

  return match[1];
};
