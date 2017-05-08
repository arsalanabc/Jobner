# Jobner : fast and easy way to apply for jobs

## Description: 
Jobner allows users to create and save CV and shows them relevant jobs to their skills in cards like Tinder. User can apply or ignore
by swiping right or left respectively.

### Techologies:
  - Front end: AngularJs and Ionic
  - Back end: Node.js, Express
  - Database: Firebase
  
### Testing the App
-------------------------
1. Ensure you have [Ionic](http://ionicframework.com/getting-started/) installed (and are using latest version)

2. Clone this repository

3. If creating a new project, then replace the **/www** folder with the **/www** folder from this project.

4. Add the InAppBrowser plugin (needed for Facebook OAuth on device)

        cordova plugins add org.apache.cordova.inappbrowser

5. Add the dialogs plugin (for native style alert dialogs)

        cordova plugin add org.apache.cordova.dialogs

6. Add desired platforms (when ready to test on device)

        ionic platform add ios

7. Run on desired platform

        ionic run ios
  
8. Run the project in browser -  from the project directory, run the below command in CMD

        ionic serve or ionic serve -l
    
        

**IMPORTANT NOTE:** Facebook integration for Login with Facebook and Profile menu option currently only works when running with the browser via [http://localhost:5000/#/app/sessions](http://localhost:5000/#/app/sessions) after setting up REST services below. It does not yet work via Ionic run/serve. Working on it.


Setting up the REST Services
----------------------------
** Copy the **/server** folder from this repo into the Ionic project root folder created above

1. Install server dependencies. Navigate into **/server** folder from the command line and type:

        npm install

2. Start the node server

        node server

3. Go to [http://localhost:5000/sessions](http://localhost:5000/sessions) to test your node service in your browser and make sure you see session data returned in JSON format.


Test the app in the browser with: [http://localhost:5000/#/app/sessions](http://localhost:5000/#/app/sessions)

  
