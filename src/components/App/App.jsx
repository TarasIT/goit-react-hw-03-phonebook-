import {
  parseDataFromLS,
  saveContactsToLS,
} from 'components/LocalStorageService/LocalStorageService';
import React, { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Contacts, Container, NoContactsMessage, Title } from './App.styled';

const STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState({ contacts: parseDataFromLS(STORAGE_KEY) });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts.length < prevState.contacts.length) return;
    saveContactsToLS(STORAGE_KEY, contacts);
  }

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
        <Contacts>Contacts</Contacts>
        {contacts.length !== 0 ? (
          <>
            <Filter inputHandler={filterInputHandler} filter={filter} />
            <ContactList
              contacts={filterContacts()}
              deleteContact={deleteContact}
            />
          </>
        ) : (
          <NoContactsMessage>
            There are no contacts yet. Please fill the form to add a new one!
          </NoContactsMessage>
        )}
      </Container>
    );
  }
}
