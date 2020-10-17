import fs from 'fs';
import path from 'path';

export const getDataFromFile = async (fileName) => {
  const filePath = path.resolve(`./src/mocks/${fileName}`);
  try {
    return JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
  } catch (err) {
    console.log(err);
  }
};