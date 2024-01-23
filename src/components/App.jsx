import { ContactForm } from 'components/contactform/ContactForm';
import { ContactList } from 'components/contactlist/ContactList';
import { Filter } from 'components/filter/Filter';
import React from 'react';
import { nanoid } from 'nanoid';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const LocalContacts = localStorage.getItem('Contacts');
    if (LocalContacts) {
      this.setState({ contacts: JSON.parse(LocalContacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }

  handlerDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  handlerFilterName = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredData = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handlerAddNameNumber = option => {
    const { contacts } = this.state;
    const { name, number } = option;
    const newObject = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const isExist = contacts.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [...contacts, newObject],
      localContact: true,
    }));
  };

  render() {
    const filterContacts = this.getFilteredData();
    const { filter, contacts } = this.state;

    return (
      <div
        style={{
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          addNameNumber={this.handlerAddNameNumber}
        />
        <h2>Find contact by name</h2>
        <Filter filter={filter} filterName={this.handlerFilterName} />
        <ContactList
          contacts={filterContacts}
          onLeaveFeedback={this.handlerDeleteContact}
        />
      </div>
    );
  }
}
