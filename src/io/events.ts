export default {
  order: {
    newOrder: 'new_order', // (only performers) ?many?
    newPerformer: 'new_performer_request', // (customer)?one?
    newComment: 'new_comment', // (customer)?one?
    performerRequestCanceled: 'performer_request_canceled', // (performer)?one?
    performerConfirmed: 'performer_confirmed', // (subscribers) ?many?
    refusedPerformer: 'refused_performer', // (customer and subscribers) ?many?
    inProcessing: 'in_processing', // (customer)?one?
    canceledPerformer: 'canceled performer', // (subscribers, performers and canceled performer)?many?
    done: 'order_done', // done - (customer)?one?
    closed: 'order_closed', // closed - (performer)
    canceled: 'order_canceled', // canceled - (performer)
    delete: 'order_delete', // delete - (subscribers)
  },
};
