require('dotenv').config();
const app = require('./src/app');
const { database } = require('./src/config/db');

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await database.sync({ force: true });
    console.log(`Server is listening on port ${PORT}`);
});
