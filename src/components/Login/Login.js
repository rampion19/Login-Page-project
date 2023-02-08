import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollageName, setEnteredCollageName] = useState('');
  // const [collageNameIsValid, setCollageNameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  })
  const authCtx = useContext(AuthContext)
  const { isvalid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking validity')
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);
    return () => {
      console.log('cleanup')
      clearTimeout(identifier);
    }

  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    emailDispatch({ type: 'USER_INPUT', val: event.target.value })
    setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
    // && enteredCollageName.trim().length > 1
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passwordDispatch({ type: 'USER_INPUT', val: event.target.value })
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
    //      && enteredCollageName.trim().length > 1;
  };

  // const collageNameHandler = (event) => {
  //   setEnteredCollageName(event.target.value);
  // }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes('@'));
    emailDispatch({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passwordDispatch({ type: 'INPUT_BLUR' })
  };

  // const validateCollageNameHandler = () => {
  //   setCollageNameIsValid(enteredCollageName.trim().length > 1)
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onblur={validateEmailHandler} />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onblur={validatePasswordHandler} />
       
        {/* <div
          className={`${classes.control} ${collageNameIsValid > 1 ? classes.invalid : ''
            }`}
        >
          <label htmlFor="collage">Collage Name</label>
          <input
            type="text"
            id="collage"
            value={enteredCollageName}
            onChange={collageNameHandler}
            onBlur={validateCollageNameHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
