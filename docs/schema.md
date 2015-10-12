# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
username        | string    | not null
profile_pic_url | string    |
bio             | text      |
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## competitions
column name           | data type | details
----------------------|-----------|-----------------------
id                    | integer   | not null, primary key
name                  | string    | not null
location              | string    | not null
description           | text      | not null
profile_pic_url       | string    |
competition_owner_id  | integer   | not null, foreign key (references users), indexed

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
date        | datetime  | not null
duration    | integer   | not null
description | text      | not null

## user_competitions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed, unique [competition_id]
competition_id  | integer   | not null, foreign key (references competitions), indexed

## user_events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed, unique [event_id]
event_id    | integer   | not null, foreign key (references events), indexed

## competition_events
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
competition_id  | integer   | not null, foreign key (references competitions), indexed, unique [event_id]
event_id        | integer   | not null, foreign key (references events), indexed

## interests
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null, indexed, unique

## user_interests
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
user_id      | integer   | not null, foreign key (references users), indexed, unique [interest_id]
interest_id  | integer   | not null, foreign key (references interests), indexed

## competition_interests
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
competition_id  | integer   | not null, foreign key (references competitions), indexed, unique [interest_id]
interest_id     | integer   | not null, foreign key (references interests), indexed

## competition_photos
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
url            | string    | not null
competition_id | integer   | not null, foreign key (references competitions), indexed

## competition_discussions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
contents        | text      |
author_id       | integer   | not null, foreign key (references users), indexed
competition_id  | integer   | not null, foreign key (references competitions), indexed

## user_messages
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
contents        | text      |
receiver_id     | integer   | not null, foreign key (references users), indexed
sender_id       | integer   | not null, foreign key (references users), indexed
