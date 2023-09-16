# Comment Moderation -
We can have multiple comment related changes like moderation, updation, downvotes, upvotes, etc. We should allow comment service to handle the logic, and the queryservice would only update the received comment as it is in the db

Eg: User submits a comment > comment service adds to list of comments with  a pending status > comment service emits an event to event bus > event bus to query service 
Once moderation service updates the comment, it send as event to event bus as comment updated > 
query service handles this commentupdated event and uses the new comment in the data as it to updated in its data store


CS -----------CommentCreated --------> EventBus (comment created with pending status)
EventBus------CommentCreated --------> QS (stores comment woith pending status)
EventBus -----CommentCreated --------> MS (sent to MS for moderation which uses some rules)

MS------------CommentModerated ------> EventBus
EventBus -----CommentModerated ------> CS (updates the status of the comment)

CS -----------CommentUpdated --------> EventBus
EventBus -----CommentUpdated --------> QueryService (updates the comment as is, no logic added)