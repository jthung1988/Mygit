CREATE DATABASE GameShop
ON
(
  NAME = 'GameShop',
  FILENAME='C:\GitHub\FinalProject\GameShop.mdf',
  SIZE = 10MB,
  FILEGROWTH=10%
)
GO

USE GameShop
GO

CREATE TABLE Profile(
  userId VARCHAR(50) NOT NULL PRIMARY KEY,
  userName NVARCHAR(50) NOT NULL,
  userPwd VARCHAR(50) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  gender VARCHAR(1) ,
  userImg VARBINARY(MAX) DEFAULT 0
)
GO

CREATE TABLE ProfileDetail(
  userId VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Profile(userId),
  address VARCHAR(100),
  birthday DATE,
  phone VARCHAR(15)
)
GO

--DROP TABLE Profile
INSERT INTO Profile(userId,userName,userPwd,mail)
VALUES('uid1','unm1','upd1','u1@')

INSERT INTO ProfileDetail(userId)
VALUES('uid1')