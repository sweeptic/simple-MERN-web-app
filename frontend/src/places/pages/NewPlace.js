import React, { useContext } from 'react';

import Button from './../../shared/components/Formelements/Button';
import Input from './../../shared/components/Formelements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from './../../shared/util/validators';
import { useForm } from './../../shared/hooks/form-hook';
import { useHttpClient } from './../../shared/hooks/http-hook';
import { AuthContext } from './../../shared/context/auth-context';
import ErrorModal from './../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../../shared/components/Formelements/ImageUpload';
import './PlaceForm.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', auth.userId);
      formData.append('image', formState.inputs.image.value);

      await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token,
      });
      //REDIRECT the user to a different page
      history.push('/');
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='title'
          type='text'
          label='Title'
          element='input'
          validators={[VALIDATOR_REQUIRE()]}
          // onChange={}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
        />
        <Input
          id='description'
          label='Description'
          element='textarea'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description ( at least 5 characters).'
          onInput={inputHandler}
        />
        <Input
          id='address'
          label='Address'
          element='input'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address.'
          onInput={inputHandler}
        />
        <ImageUpload
          id='image'
          onInput={inputHandler}
          errorText='Please provide an image.'
        />
        <Button type='submit' disabled={!formState.isValid}>
          APP PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
