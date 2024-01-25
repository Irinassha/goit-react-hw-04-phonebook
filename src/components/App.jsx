import { nanoid } from 'nanoid';
import { ContactForm } from './contactform/ContactForm';
import { ContactList } from './contactlist/ContactList';
import { Filter } from './filter/Filter';
import { useEffect, useMemo, useState } from 'react';

export const App = () => {
  const contactsId = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    const LocalContacts = localStorage.getItem('Contacts');
    return contactsId && JSON.parse(LocalContacts);
  });

  const [filters, setFilters] = useState('');

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handlerDeleteContact = id => {
    setContacts(contacts.filter(item => item.id !== id));
  };

  const handlerFilterName = e => {
    setFilters(e.target.value);
  };

  const getFilteredData = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filters.toLowerCase())
      ),
    [contacts, filters]
  );

  const handlerAddNameNumber = option => {
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

    setContacts(prevState => [...contacts, newObject]);
  };

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
      <ContactForm contacts={contacts} addNameNumber={handlerAddNameNumber} />
      <h2>Find contact by name</h2>
      <Filter filters={filters} filterName={handlerFilterName} />
      <ContactList
        contacts={getFilteredData}
        onLeaveFeedback={handlerDeleteContact}
      />
    </div>
  );
};
