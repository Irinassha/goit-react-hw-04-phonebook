import React from 'react';
import s from './ContactForm.module.css';
export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  hendlerChange = e => {
    const { name, value } = e.target;
    const inputNumber = value.replace(/[^0-9+]/, '');
    if (name === 'number') {
      this.setState({ [name]: inputNumber });
    }
    if (name === 'number' && value !== inputNumber) {
      alert('Please use numbers only');
    }
    this.setState({ [name]: value });
  };

  handlerAdd = () => {
    if (this.state.name === '' || this.state.number === '') {
      return alert('Please fill in all fields');
    }
    this.props.addNameNumber(this.state);
    this.setState(prevState => ({
      name: '',
      number: '',
    }));
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form}>
        <div className={s.formInput}>
          <label className={s.formLabel}>Name </label>
          <input
            className={s.input}
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            value={name}
            onChange={this.hendlerChange}
          />
        </div>
        <div className={s.formInput}>
          <label className={s.formLabel}>Number </label>
          <input
            className={s.input}
            type="tel"
            name="number"
            required
            placeholder="Enter your phone number"
            value={number}
            onChange={this.hendlerChange}
          />
        </div>
        <button className={s.formBtn} type="button" onClick={this.handlerAdd}>
          Add contact
        </button>
      </form>
    );
  }
}
