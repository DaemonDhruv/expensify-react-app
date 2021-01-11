import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
    <div>
        404: Page not found.
        <Link to="/">Go Home</Link> {/* Link tells the browser to not send request to server. This avoids page reload. */}
    </div>
);

export default PageNotFound;