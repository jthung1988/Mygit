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
  userToken VARCHAR(100),
  nickname NVARCHAR(50) NOT NULL UNIQUE,
  mail VARCHAR(100) NOT NULL UNIQUE,
  gender VARCHAR(1) ,
  userImg VARBINARY(MAX)
)
GO

CREATE TABLE ProfileDetail(
  userId VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Profile(userId),
  address VARCHAR(100),
  birthday DATE,
  phone VARCHAR(15)
)
GO

--DROP TABLE ProfileDetail
--DROP TABLE Profile

INSERT INTO Profile(userId,userName,nickName,userPwd,mail)
VALUES('uid1','unm1','nn1','upd1','u1@')

INSERT INTO ProfileDetail(userId)
VALUES('uid1')