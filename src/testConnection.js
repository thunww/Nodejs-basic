const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => {
    console.log('Kết nối thành công!');
  })
  .catch(err => {
    console.error('Không thể kết nối:', err);
  });
