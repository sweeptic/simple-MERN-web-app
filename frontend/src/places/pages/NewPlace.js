import React from 'react';
import './NewPlace.css';
import Input from './../../shared/components/Formelements/Input';

const NewPlace = () => {
  return (
    <form className="place-form">
      {/* <Input type="text" label="Title" validators={[]} onChange={} /> */}
      <Input type="text" label="Title" element="input" />
    </form>
  );
};

export default NewPlace;
