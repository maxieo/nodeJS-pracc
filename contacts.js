const fs = require('fs');
const { parse } = require('path');
const path = require('path')

const contactPath = path.resolve('./db/contacts.json')

async function listContacts() { 
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const parsedData = await JSON.parse(data)
  } catch (error) {
    console.log(error.message);
  }
}


async function getContactById(contactId) { 
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const parsedData = await JSON.parse(data)
    const result = await parsedData.find((item) => Number(item.id) === contactId)  
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) { 
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const parsedData = await JSON.parse(data)
    const deleteContact = await parsedData.find((item) => Number(item.id) === contactId)
    if (deleteContact) {
      const index = parsedData.indexOf(deleteContact)
      parsedData.splice(index, 1)
      await fs.writeFile(contactPath, JSON.stringify(parsedData), "utf-8")
    } else { 
      return console.log('Contacts were not found');
    }
  } catch (error) {
    console.log(error.message);
  }
}


// try {
//   const data = await fs.readFile(contactPath, "utf-8")
//   const parsedData = await JSON.parse(data)
//   const deleteContact = await parsedData.find((item) => Number(item.id) === contactId)
  
//   if (deleteContact) { 
//     const index = parsedData.indexOf(deleteContact)
//     parsedData.splice(index, 1)
//     await fs.writeFile(contactPath, JSON.stringify(parsedData), "utf-8")
// } catch (error) {
  
// }