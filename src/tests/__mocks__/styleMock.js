module.exports = {};

/* 

Configuring Jest to gracefully handle asset files such as 
stylesheets and images. Usually, these files aren't 
particularly useful in tests so we can safely mock them out
GOTO: https://jestjs.io/docs/en/webpack#handling-static-assets



If that's the issue with running Jest, then mocking style files should help:

    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
where styleMock is simply:

module.exports = {};



We have the exact same issue here.

When installing the package for the first time we are able to compile and run.
When stopping and starting our build process we get the unexpected token issue.

Looking into this, it seems that our compiler thinks that the css page Calendar.css is actually a javascript file.
I am not sure why this happens. For the time being we do the following to avoid the issue.
require.extensions['.css'] = () => { return; };
Placing the above directly under require('babel-register') fixes the issue for us.

I don't know why this fixes our issue, if anyone has experience with babel and webpack and can shine some light on this that would be great.
 */