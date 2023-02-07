import React from 'react';
import { useIntl } from 'react-intl';
import messages from '../../../Messages';

const App = () => {
    const intl = useIntl();

    return <>
        <h1>{intl.formatMessage(messages.welcomeTitle)}</h1>
        <p>{intl.formatMessage(messages.welcomeText)}</p>
    </>
};

export default App;
