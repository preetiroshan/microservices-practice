# microservices-practice
This is project to practice and understand microservices architecture
Different services and their posts

Different Services and the ports used here:
PS (Post Service)       -> 4000 -> Responsible for creating new posts

CS (Comment Service)    -> 4001 -> Responsible for creating new comments on posts and handling comment specific functionalities like moderation etc.

QS (Query Service)      -> 4002 -> Stores the post details along with associated comments

MS (Moderation Service) -> 4003 -> Moderates the comment based on some condition

EB (Event Bus)          -> 4004 -> Used to propogate events between various services