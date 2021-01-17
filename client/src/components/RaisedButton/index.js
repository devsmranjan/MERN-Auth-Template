import React from 'react';
import { Button } from 'react-bootstrap';

const RaisedButton = ({ title, href, onClick }) => {
    return (
        <Button variant="primary" href={href} onClick={onClick}>
            {title}
        </Button>
    );
};

export default RaisedButton;
