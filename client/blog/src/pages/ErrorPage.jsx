import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return <div id='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpexted error occurred.</p>
        <p>
            <li>{error.statusText || error.message}</li>
        </p>
    </div>;
};

export default ErrorPage;