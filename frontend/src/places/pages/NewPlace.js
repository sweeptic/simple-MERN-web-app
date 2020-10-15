import React from 'react';
import './NewPlace.css';
import Input from './../../shared/components/Formelements/Input';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        type="text"
        label="Title"
        element="input"
        validators={[]}
        // onChange={}
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewPlace;
