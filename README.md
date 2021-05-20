# Expense Tracker App

A live version of this app is being run as a [Digital Ocean App](https://expense-tracker-jeannelmyt-g2sqi.ondigitalocean.app/) working with a [backend that is running on Heroku](https://expense-tracker-backend-jean.herokuapp.com/), and a MYSQL database running on a Digital Ocean server. Other than the database, both apps are running on free-tier servers so please excuse the slowness for which the app loads data.  

## How to run locally 

This was made to run with [a backend](https://github.com/JeannelMYT/expense-tracker-backend-jeannelmyt) so please download and run that first.

### Clone the app
`git clone https://github.com/JeannelMYT/expense-tracker-jeannelmyt.git`

### If you use npm
Build the app
`npm run build`

Start the app
`npm run start`

### If you use yarn
Build the app
`yarn build`

Start the app
`yarn start`


After starting, navigate to `localhost:3000` on the browser and you should be directed to the Register/Login page.


## Additional Notes

1. Localstorage is used in this case as usually people will enter expenses from the same device.

2. Ideally I would have preferred to have fixed widths for the react-table, but as I am unfamiliar with the library, I was unable to get this to work properly. 

3. Sorry for how bare it looks, design is not my forte. 

4. There are many things I would like to improve on this, (e.g. addition of automated tests, sending of emails for new account verification and password change).

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project also utilises the following libraries:
- [react-router-dom](https://reactrouter.com/)
- [dotenv](https://github.com/motdotla/dotenv)
- [react-table](https://www.npmjs.com/package/react-table)