import React, { useCallback } from 'react';
import './NewPlace.css';
import Input from './../../shared/components/Formelements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from './../../shared/util/validators';

const NewPlace = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);
  const descriptionInputHandler = useCallback((id, value, isValid) => {}, []);

  return (
    <form className="place-form">
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        // onChange={}
        errorText="Please enter a valid title."
        onInput={titleInputHandler}
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        element="input"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        // onChange={}
        errorText="Please enter a valid description ( at least 5 characters)."
        onInput={descriptionInputHandler}
      />
    </form>
  );
};

export default NewPlace;
