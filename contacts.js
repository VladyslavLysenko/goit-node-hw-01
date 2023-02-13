const path = require("node:path");
const contactsPath = path.join("./db", "contacts.json");
const { randomUUID } = require("crypto");
const fs = require("fs").promises;

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(JSON.parse(data.toString())))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      console.log(contacts.find((item) => item.id === contactId.toString()));
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const foundIndex = contacts.findIndex(
        (item) => item.id === contactId.toString()
      );

      contacts.splice(foundIndex, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts));
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      contacts.push({
        id: randomUUID(),
        name: name,
        email: email,
        phone: phone,
      });
      fs.writeFile(contactsPath, JSON.stringify(contacts));
    })
    .catch((err) => console.log(err.message));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
