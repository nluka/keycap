import axios from 'axios';
import type { IServerResponseDataUserSignInSuccess } from 'keycap-foundation';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import React, { useState } from 'react';
import { actionCreatorUserSignIn } from '../../../redux/actions/userActions';
import { useAppDispatch } from '../../../redux/hooks';
import displayAlert from '../../../utility/functions/displayAlert';
import FormField from '../Field/FormField';
import Form from '../Form';
import FormSubmitButton from '../SubmitButton/FormSubmitButton';

export default function FormSignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const dispatch = useAppDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsAwaitingResponse(true);

    try {
      const resData: IServerResponseDataUserSignInSuccess = (
        await axios.post('/user/sign-in', {
          username,
          password,
        })
      ).data;

      setIsAwaitingResponse(false);

      dispatch(
        actionCreatorUserSignIn({
          token: resData.token,
          name: resData.name,
        }),
      );
    } catch (err: any) {
      setIsAwaitingResponse(false);

      if (!err.response) {
        displayAlert('Sign in failed.\nReason: unable to connect to server.');
      } else {
        displayAlert(
          `Sign in failed.\nReason: ${
            err.response.status === HTTP_STATUS.INTERNAL_SERVER_ERROR
              ? 'internal server error'
              : 'invalid credentials'
          }.`,
        );
      }
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      classes="d-flex flex-column flex-md-row gap-2"
    >
      <FormField
        autoCapitalize={false}
        autoComplete={false}
        autoCorrect={false}
        autoFocus={true}
        inputElementId="signInUsernameInput"
        isRequired={true}
        name="Username"
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
        spellCheck={false}
        type="text"
        value={username}
      />
      <FormField
        inputElementId="signInPasswordInput"
        isRequired={true}
        name="Password"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        type="password"
        value={password}
      />
      <FormSubmitButton
        classes="d-flex align-items-center gap-1 py-1"
        isAwaitingResponse={isAwaitingResponse}
      >
        <>
          <i className="bi bi-box-arrow-in-left"></i>
          <span>Sign In</span>
        </>
      </FormSubmitButton>
    </Form>
  );
}
