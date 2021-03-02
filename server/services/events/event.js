const { EventEmitter } = require('events');
const Log = require('../../services/mongodb/models/Logs');

const eventEmitter = new EventEmitter();

const eventMessage = (type, metadata, hasFailed) => {
  var message;

  switch (type) {
    case 'USER_ADDED':
      if (hasFailed) {
        message = metadata.email
          ? `Failed to add user "${metadata.email}`
          : `Failed to add user`;
      } else {
        message = `User "${metadata.email}" was added successfully`;
      }
      return message;
  }
};

eventEmitter.on('log', async ({ metadata, type, userId, hasFailed }) => {
  var eventType = type.split('_')[0];
  var data;
  var message;
  switch (eventType) {
    case 'USER':
      message = eventMessage(type, metadata, hasFailed);
      break;
  }

  const statusLog = new Log({
    metadata,
    type,
    message,
  });
  try {
    await statusLog.save();
  } catch (err) {
    console.log(err);
  }
});

exports.event = eventEmitter;
