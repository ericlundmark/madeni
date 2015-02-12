/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Debt = require('./debt.model');

exports.register = function(socket) {
  Debt.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Debt.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('debt:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('debt:remove', doc);
}