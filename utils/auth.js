import bcrypt from 'bcrypt';

const workFactor = 8;
const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(workFactor);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export { generateHash };
