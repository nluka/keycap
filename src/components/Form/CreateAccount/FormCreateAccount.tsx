import axios from 'axios';
import {
  DEFAULT_PRACTICE_SETTINGS,
  IServerResponseDataUserCreationSuccess,
} from 'keycap-foundation';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import NumberRange from 'nluka-number-range';
import React, { SetStateAction, useState } from 'react';
import { Redirect } from 'react-router-dom';
import localStorageItems from '../../../local-storage';
import {
  actionCreatorUserSignIn,
  actionCreatorUserSignOut,
} from '../../../redux/actions/userActions';
import { useAppDispatch } from '../../../redux/hooks';
import capitalizeFirstChar from '../../../utility/functions/capitalizeFirstChar';
import displayAlert from '../../../utility/functions/displayAlert';
import FormField from '../Field/FormField';
import Form from '../Form';
import FormSubmitButton from '../SubmitButton/FormSubmitButton';

export default function FormCreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const [usernameFeedback, setUsernameFeedback] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [passwordConfirmationFeedback, setPasswordConfirmationFeedback] =
    useState('');
  const [wasAccountCreationSuccessful, setWasAccountCreationSuccessful] =
    useState(false);
  const dispatch = useAppDispatch();

  if (wasAccountCreationSuccessful) {
    return <Redirect to="/" />;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAwaitingResponse(true);
    let errors: string[] = [];

    try {
      const resData: IServerResponseDataUserCreationSuccess = (
        await axios.post('/user/create', {
          username,
          password,
          practiceSettings: JSON.parse(
            localStorage.getItem(localStorageItems.practiceSettings) ||
              JSON.stringify(DEFAULT_PRACTICE_SETTINGS),
          ),
        })
      ).data;

      dispatch(actionCreatorUserSignOut());
      dispatch(
        actionCreatorUserSignIn({
          token: resData.token,
          name: resData.name,
        }),
      );
    } catch (err: any) {
      errors = err.response
        ? err.response.data.errors
        : ['unable to connect to server'];

      if (!err.response) {
        displayAlert(
          'Account creation failed.\nReason: unable to connect to server.',
        );
      } else if (err.response.status === HTTP_STATUS.CONFLICT) {
        setUsernameFeedback('name taken');
      } else if (err.response.status === HTTP_STATUS.BAD_REQUEST) {
        displayAlert(
          'Account creation failed.\nReason(s):\n' +
            errors.map((err) => `${capitalizeFirstChar(err)}`).join('\n'),
        );
      } else {
        displayAlert(
          'Account creation failed.\nReason: internal server error.',
        );
      }
    } finally {
      setIsAwaitingResponse(false);
      if (errors.length === 0) {
        setWasAccountCreationSuccessful(true);
      }
    }
  }

  return (
    <Form
      classes="d-flex flex-column gap-3"
      containerClasses="d-flex flex-column gap-3"
      heading="Create a new account"
      onSubmit={handleSubmit}
    >
      <FormField
        autoCapitalize={false}
        autoComplete={false}
        autoCorrect={false}
        feedback={usernameFeedback}
        inputElementId="createAccountUsernameInput"
        isRequired={true}
        name="Username"
        onBlur={() =>
          validateUsername({
            value: username,
            setFeedback: setUsernameFeedback,
          })
        }
        onChange={(event) =>
          handleChange(event, username, setUsername, setUsernameFeedback)
        }
        placeholder="3-32 letters/numbers/dashes/underscores"
        showLabel={true}
        spellCheck={false}
        type="text"
        value={username}
      />
      <FormField
        feedback={passwordFeedback}
        inputElementId="createAccountPasswordInput"
        isRequired={true}
        name="Password"
        onBlur={() =>
          validatePassword({
            value: password,
            setFeedback: setPasswordFeedback,
          })
        }
        onChange={(event) => {
          handleChange(event, password, setPassword, setPasswordFeedback);
          if (
            passwordConfirmation.length > 0 &&
            passwordConfirmation !== event.target.value
          ) {
            setPasswordConfirmationFeedback('passwords must match');
          } else {
            setPasswordConfirmationFeedback('');
          }
        }}
        placeholder="8-64 letters/spaces/numbers/symbols"
        showLabel={true}
        type="password"
        value={password}
      />
      <FormField
        feedback={passwordConfirmationFeedback}
        inputElementId="createAccountPasswordConfirmationInput"
        isRequired={true}
        name="Confirm Password"
        onBlur={() =>
          validatePasswordConfirmation(
            {
              value: passwordConfirmation,
              setFeedback: setPasswordConfirmationFeedback,
            },
            password,
          )
        }
        onChange={(event) => {
          setPasswordConfirmation(event.target.value);
          if (event.target.value !== password) {
            setPasswordConfirmationFeedback('passwords must match');
          } else {
            setPasswordConfirmationFeedback('');
          }
        }}
        showLabel={true}
        type="password"
        value={passwordConfirmation}
      />
      <FormSubmitButton
        classes="d-flex align-items-center gap-2"
        isAwaitingResponse={isAwaitingResponse}
        isDisabled={
          usernameFeedback.length > 0 ||
          passwordFeedback.length > 0 ||
          passwordConfirmationFeedback.length > 0
        }
      >
        <i className="bi bi-person-plus"></i>
        <span>Create Account</span>
      </FormSubmitButton>
    </Form>
  );
}

interface IField {
  value: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
}
function validateUsername(username: IField) {
  if (username.value.length === 0) {
    username.setFeedback('');
    return;
  }

  const LENGTH_LIMITS = new NumberRange(3, 32);

  if (username.value.length < LENGTH_LIMITS.getMin()) {
    username.setFeedback(
      `username must be at least ${LENGTH_LIMITS.getMin()} characters long`,
    );
  } else if (username.value.length > LENGTH_LIMITS.getMax()) {
    username.setFeedback(
      `username must be no longer than ${LENGTH_LIMITS.getMax()} characters`,
    );
  } else if (!username.value.match(/^[a-zA-Z0-9-_]{3,32}$/g)) {
    username.setFeedback(
      'username must only contain letters/numbers/dashes/underscores',
    );
  } else if (!username.value.match(/[a-zA-Z]+/)) {
    username.setFeedback('username must contain at least 1 letter');
  } else {
    username.setFeedback('');
  }
}

function validatePassword(password: IField) {
  if (password.value.length === 0) {
    password.setFeedback('');
    return;
  }

  const LENGTH_LIMITS = new NumberRange(8, 64);

  if (password.value.length < LENGTH_LIMITS.getMin()) {
    password.setFeedback(
      `password must be at least ${LENGTH_LIMITS.getMin()} characters long`,
    );
  } else if (password.value.length > LENGTH_LIMITS.getMax()) {
    password.setFeedback(
      `password must be no longer than ${LENGTH_LIMITS.getMax()} characters`,
    );
  } else {
    password.setFeedback('');
  }
}

function validatePasswordConfirmation(
  passwordConfirmation: IField,
  password: string,
) {
  if (passwordConfirmation.value.length === 0) {
    passwordConfirmation.setFeedback('');
    return;
  }

  if (passwordConfirmation.value !== password) {
    passwordConfirmation.setFeedback('passwords must match');
  } else {
    passwordConfirmation.setFeedback('');
  }
}

function handleChange(
  event: React.ChangeEvent<HTMLInputElement>,
  value: string,
  setValue: React.Dispatch<SetStateAction<string>>,
  setFeedback: React.Dispatch<SetStateAction<string>>,
) {
  setValue(event.target.value);
  if (value.length > 0) {
    setFeedback('');
  }
}
