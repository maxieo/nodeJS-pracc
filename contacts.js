const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");

const contactPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const parseResult = await JSON.parse(data);
    await console.table(parseResult);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const parseResult = await JSON.parse(data);
    const findContact = await parseResult.find(
      (contact) => Number(contact.id) === contactId
    );
    console.log(findContact);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const parseResult = await JSON.parse(data);
    const deleteContact = await parseResult.find((contact) => Number(contact.id) === contactId);

    if (deleteContact) {
      const index = parseResult.indexOf(deleteContact)
      parseResult.splice(index, 1)
      await fs.writeFile(contactPath, JSON.stringify(parseResult), "utf-8")
      console.log("User has been remove");
    } else { 
      return console.log("User were not found");
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const parseResult = await JSON.parse(data);
    const id = randomUUID();

    const contact = { id, name, email, phone };
    const updateContacts = [...parseResult, contact];
    await fs.writeFile(contactPath, JSON.stringify(updateContacts), "utf-8");
    await console.log("User has been added");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
