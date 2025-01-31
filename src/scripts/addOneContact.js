import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
  let contacts = [];
  try {
    const data = await fs.readFile(PATH_DB, { encoding: 'utf-8' });
    contacts = JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('File not found, create a new file.');
    } else {
      console.error('Error reading file:', error);
      throw error;
    }
  }
  try {
    const newContact = createFakeContact();
    contacts.push(newContact);
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to file:', error);
    throw error;
  }
};

addOneContact();

