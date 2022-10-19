import React, { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Contacts, Container, Title } from './App.styled';

const STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.getContactFromStorage(STORAGE_KEY);
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts.length < prevState.contacts.length) return;
    this.saveContactsToStorage(STORAGE_KEY, contacts);
  }

  getContactFromStorage = key => {
    let savedContacts = localStorage.getItem(key);
    if (savedContacts === null) return;
    savedContacts = JSON.parse(savedContacts);
    this.setState({ contacts: savedContacts });
  };

  saveContactsToStorage = (key, contact) => {
    const changedContactsState = JSON.stringify(contact);
    localStorage.setItem(key, changedContactsState);
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normilizedFilter)
    );
  };

  addNewContact = newContact => {
    const { contacts } = this.state;
    const identicalContact = contacts.find(({ name }) => {
      return name.toLowerCase() === newContact.name.toLowerCase();
    });
    if (identicalContact !== undefined) {
      return alert(`${identicalContact.name} is already in contacts!`);
    }
    this.setState({
      contacts: [...contacts, newContact],
    });
  };

  filterInputHandler = value => {
    this.setState({
      filter: value,
    });
  };

  reset = () => {
    this.filterInputHandler('');
  };

  deleteContact = contactId => {
    const { contacts } = this.state;
    const newArray = contacts.filter(({ id }) => id !== contactId);
    this.setState({
      contacts: newArray,
    });
    this.reset();
  };

  render() {
    const { contacts, filter } = this.state;
    const { addNewContact, filterInputHandler, filterContacts, deleteContact } =
      this;

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm submitHandler={addNewContact} />
        {contacts.length !== 0 && (
          <>
            <Contacts>Contacts</Contacts>
            <Filter inputHandler={filterInputHandler} filter={filter} />
            <ContactList
              contacts={filterContacts()}
              deleteContact={deleteContact}
            />
          </>
        )}
      </Container>
    );
  }
}
