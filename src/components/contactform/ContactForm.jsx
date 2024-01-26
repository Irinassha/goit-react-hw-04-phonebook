import React, { useState } from 'react';
import s from './ContactForm.module.css';
export const ContactForm = ({ addNameNumber }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const hendlerChange = e => {
    const { name, value } = e.target;
    const inputNumber = value.replace(/[^0-9+]/, '');

    if (name === 'number' && value !== inputNumber) {
      alert('Please use numbers only');
    }

    if (name === 'number') {
      return setNumber(inputNumber);
    }

    setName(value);
  };

  const handlerAdd = () => {
    if (name === '' || number === '') {
      return alert('Please fill in all fields');
    }
    addNameNumber({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form}>
      <div className={s.formInput}>
        <label className={s.formLabel}>Name </label>
        <input
          className={s.input}
          type="text"
          name="name"
          required
          placeholder="Enter name"
          value={name}
          onChange={hendlerChange}
        />
      </div>
      <div className={s.formInput}>
        <label className={s.formLabel}>Number </label>
        <input
          className={s.input}
          type="tel"
          name="number"
          required
          placeholder="Enter phone number"
          value={number}
          onChange={hendlerChange}
        />
      </div>
      <button className={s.formBtn} type="button" onClick={handlerAdd}>
        Add contact
      </button>
    </form>
  );
};
