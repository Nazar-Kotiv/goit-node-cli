import { promises as fs } from "fs";
import path from "path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function readContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(contacts);
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}
listContacts().catch((error) => console.error(error));

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (typeof contact === "undefined") {
    return null;
  }
  return contact;
}
getContactById().catch((error) => console.error(error));

async function removeContact(contactId) {
  const allContacts = await readContacts();
  const removeIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (removeIndex === -1) {
    return null;
  }
  const [res] = allContacts.splice(removeIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return res;
}
removeContact().catch((error) => console.error(error));

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

addContact().catch((error) => console.error(error));

export default { listContacts, getContactById, removeContact, addContact };
