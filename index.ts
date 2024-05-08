import app from './app';
import { PORT } from './src/config/constants';

// Start the server
const server = app.listen(PORT, () => {
  console.log(0, `Server is running on port ${PORT}`);
});

export default server;
