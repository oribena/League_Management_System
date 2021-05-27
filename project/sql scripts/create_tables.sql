-- DROP TABLE [dbo].[users]
-- DROP TABLE [dbo].[favorits]
-- DROP TABLE [dbo].[eventbook]
-- DROP TABLE [dbo].[matches]

-- CREATE TABLE [dbo].[users](
-- 	[user_id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
-- 	[username] [varchar](30) NOT NULL UNIQUE,
-- 	[password] [varchar](300) NOT NULL,
-- 	[firstname] [varchar](300) ,
-- 	[lastname] [varchar](300) ,
-- 	[country] [varchar](300) ,
-- 	[email] [varchar](300) ,
-- 	[profilePic] [varchar](300),
-- 	[permission] [int] DEFAULT 1
-- )

-- CREATE TABLE [dbo].[matches](
-- 	[match_id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
-- 	[date] [varchar](300) NOT NULL,
-- 	[time] [varchar](300) NOT NULL,
-- 	[hometeam] [varchar](300) ,
-- 	[awayteam] [varchar](300) ,
-- 	[stadium] [varchar](300) ,
-- 	[result] [varchar](300) ,
-- 	[referee] [varchar](300),
-- 	[occur] BIT default 'FALSE',

-- )

-- CREATE TABLE [dbo].[eventbook](
-- 	[eventbook_id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
-- 	[match_id] [int] NOT NULL,
-- 	[date] [varchar](300) NOT NULL,
-- 	[time] [varchar](300) NOT NULL,
-- 	[gamemin] [varchar](300) ,
-- 	[event] [varchar](300),
-- 	FOREIGN KEY(match_id) REFERENCES matches(match_id)
-- )

-- CREATE TABLE [dbo].[favorits](
-- 	[favorite_id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
-- 	[user_id] [int] NOT NULL,
-- 	[match_id] [int] NOT NULL,
-- 	FOREIGN KEY(match_id) REFERENCES matches(match_id)
-- )

-- DROP TABLE [dbo].[referee];

CREATE TABLE [dbo].[referee]
(
	[referee_id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[name] [varchar](300) NOT NULL,
)