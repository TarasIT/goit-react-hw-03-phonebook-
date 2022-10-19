import React, { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Contacts, Container, Title } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  filteredContacts = () => {
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
    const {
      addNewContact,
      filterInputHandler,
      filteredContacts,
      deleteContact,
    } = this;

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm submitHandler={addNewContact} />
        {contacts.length !== 0 && (
          <>
            <Contacts>Contacts</Contacts>
            <Filter inputHandler={filterInputHandler} filter={filter} />
            <ContactList
              contacts={filteredContacts()}
              deleteContact={deleteContact}
            />
          </>
        )}
      </Container>
    );
  }
}
