const fs = require('fs');
const path = require('path')
const { randomUUID} = require ('crypto')
const contactPath = path.resolve('./db/contacts.json')

async function listContacts() { 
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const parseResult = await JSON.parse(data)
    await console.log(parseResult);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) { 
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const parseResult = await JSON.parse(data)
    const findContact = parseResult.find((contact) => String(contact.id) === contactId)
    console.log(findContact);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) { 
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const remove = data.filter((contact) => String(contact.id) === contactId)
    await console.log(remove);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) { 
  try {
    const data = await fs.readFile (contactPath, "utf=8")
    const parseResult = await JSON.parse(data)
    const id = { id: randomUUID }
    
    const contact = { id, name, email, phone }
    const updateContacts = [...parseResult, contact]
    await fs.writeFile(contactPath, JSON.stringify(updateContacts), "utf-8")
    await console.log('Contact has been added');
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}