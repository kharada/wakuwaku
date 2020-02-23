# wakuwaku
wakuwaku automation

# Installation

1. Install Node.js
1. Git Clone into your machine
1. Create parameters.js see below. (If you wanted running on Raspberry pi, see Notes)
1. Npm installation(npm install)
1. Then you can Run code(node index.js)

# parameters.js
Put parameters.js file into the directory which includes index.js

```javascript
module.exports = {
    username : 'your username',
    password : 'your password',
    executablePath : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Depends on your environment [MacOS].
    // executablePath : '/usr/bin/chromium-browser', // Depends on your environment [like Raspberry Pi].
}
```

# Note
## Running on Raspberry pi
1. Install chromium-browser. ```sudo apt-get install chromium-browser``` 
1. Remove node_modules directory if existed.
1. Uncomment parameters.js executablePath. (also comment out MacOS version.)
1. Modify package.json puppeteer version to right one. (Check ```chromium-browser --version``` and see [Puppeteer Site](https://pptr.dev/)'s top left version link)
1. ```PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install``` instead of ```npm install```

# License
MIT.

# Why I made it?
Daily input to wakuwaku is meaningless for me. (It is NOT exciting.)
So I made.

If our company present fitbit for all employees, then I delete this repository.
