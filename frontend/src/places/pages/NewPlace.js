import React from 'react';
import './NewPlace.css';
import Input from './../../shared/components/Formelements/Input';
import { VALIDATOR_REQUIRE } from './../../shared/util/validators';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        // onChange={}
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewPlace;
