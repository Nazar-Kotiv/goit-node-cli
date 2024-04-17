import { error } from "console";
import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
  // ...твій код. Повертає масив контактів.
}
listContacts().catch((error) => console.error(error));

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === contactId);
  return contact || null;
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}
getContactById().catch((error) => console.error(error));

async function removeContact(contactId) {
  const data = await listContacts();
  const deletContact = data.filter((iteam) => iteam.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(deletContact, null, 2), {
    encoding: "utf-8",
  });

  return { deletedContactId: contactId };

  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}
removeContact().catch((error) => console.error(error));

async function addContact(name, email, phone) {
  const data = await listContacts();
  const maxId = contacts.reduce(
    (max, contact) => (contact.id > max ? contact.id : max),
    0
  );
  const newContact = {
    id: maxId + 1,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), {
    encoding: "utf-8",
  });
  return newContact;
  // ...твій код. Повертає об'єкт доданого контакту (з id).
}

addContact().catch((error) => console.error(error));
