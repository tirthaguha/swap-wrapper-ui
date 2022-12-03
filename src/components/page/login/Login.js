import { Box, Button, Form, FormField, Page, PageContent, TextInput } from "grommet";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { ACTIONS } from "../../../state/context";
const defaultValue = {
  username : "a@ms.com",
  password:"Password1"
}

const callLoginAPI = async (url = '',data)=>{
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const Login = ({dispatch, state})=>{
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();
  return (<Page kind="narrow">
  <PageContent background="light-3">
  <Form
      value={value}
      onChange={(nextValue, { touched }) => {
                   console.log('Change', nextValue, touched);
                    setValue(nextValue);
                  }}
      onReset={() => setValue(defaultValue)}
      onSubmit={async ({ value }) => {
        // console.log(value);
        const response = await callLoginAPI("/auth", value);
        dispatch({ type: ACTIONS.SET_USERNAME, data: value.username });
        dispatch({ type: ACTIONS.SET_TOKEN, data: response.token });
        navigate("/home");

      }}
    >
      <FormField name="username" htmlFor="text-input-username" label="Username">
        <TextInput id="text-input-username" name="username" />
      </FormField>
      <FormField name="password" htmlFor="text-input-password" label="Password">
        <TextInput id="text-input-password" name="password" type="password" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  </PageContent>
</Page>)

}

export default Login;
