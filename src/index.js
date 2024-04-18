import { program } from "commander";
import Contacts from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await Contacts.listContacts();
        console.table(contacts);
        break;

      case "get":
        if (!id) throw new Error("Please provide a contact ID.");
        const getContactById = await Contacts.getContactById(id);
        console.log(getContactById);
        break;

      case "add":
        if (!name || !email || !phone)
          throw new Error("Please provide name, email, and phone.");
        const addNewContact = await Contacts.addContact(name, email, phone);
        console.log(addNewContact);
        break;

      case "remove":
        if (!id) throw new Error("Please provide a contact ID.");
        const removed = await Contacts.removeContact(id);
        console.log(removed);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

invokeAction(options);
