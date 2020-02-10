CREATE DATABASE SCHOOL
ON PRIMARY
(
	NAME = 'School',
	FILENAME = 'C:\School\School.mdf',
	SIZE = 10MB,
	MAXSIZE = 50MB,
	FILEGROWTH = 20%
)
LOG ON(
	NAME = SchoolLog,
	FILENAME = 'C:\School\SchoolLog.ldf',
	SIZE = 10MB,
	MAXSIZE = 30MB,
	FILEGROWTH = 10MB
)
GO
use SCHOOL
GO
CREATE TABLE COURSE(
	CourseId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	CourseName NVARCHAR(50) NOT NULL,
	Address NVARCHAR(50) NOT NULL,
	Price INT NOT NULL
)
GO

INSERT INTO COURSE(CourseName,Address,Price)
VALUES ('Chiness',301,1000)
			,('English',302,2000)
			,('Math',303,3000)
			,('Nature',304,4000)
			,('Social',305,5000)
GO

CREATE TABLE STUDENT(
	StudentId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	StuName NVARCHAR(50) NOT NULL,
	StuAddress NVARCHAR(50),
	StuPhone NVARCHAR(20)
)
GO
INSERT INTO STUDENT(StuName,StuAddress,StuPhone)
VALUES('Andy', 'Taipei','0987141242')
			,('Betty', 'Taichung','0912345678')
			,('Cathy', 'Tainan','0988888888')
			,('David', 'Wuhan','0978747474')
			,('Elic', 'Taoyang','0966666666')
GO
CREATE TABLE GRADERESULT(
	GradeId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	StudentId	INT NOT NULL FOREIGN KEY REFERENCES STUDENT,
	CourseId INT NOT NULL FOREIGN KEY REFERENCES COURSE,
	Grade INT CHECK(Grade BETWEEN 0 AND 100),
	Remark NVARCHAR(50)
)
GO

INSERT INTO GRADERESULT(StudentId,CourseId,Grade,Remark)
VALUES(1, 1, 83, 'B'),(1, 2, 61, 'D'),(1, 3, 60, 'D'),(1, 4, 85, 'B'),(1, 5, 65, 'D')
			,(2, 1, 89, 'B'),(2, 2, 63, 'D'),(2, 3, 70, 'C'),(2, 4, 66, 'D'),(2, 5, 76, 'C')
			,(3, 1, 100, 'A'),(3, 2, 91, 'A'),(3, 3, 82, 'B'),(3, 4, 99, 'A'),(3, 5, 69, 'D')
			,(4, 1, 70, 'C'),(4, 2, 74, 'C'),(4, 3, 99, 'A'),(4, 4, 79, 'C'),(4, 5, 77, 'C')
			,(5, 1, 70, 'C'),(5, 2, 97, 'A'),(5, 3, 61, 'D'),(5, 4, 84, 'B'),(5, 5, 83, 'B')
GO

CREATE VIEW STATSCLASS
AS
SELECT * 
,(piv.Chiness+piv.English+piv.Math+piv.Nature+piv.Social) AS Grade
,RANK() OVER (ORDER BY piv.Chiness+piv.English+piv.Math+piv.Nature+piv.Social DESC)AS Rank 
FROM
(
	SELECT StuName AS NAME,CourseName AS CLASS, gra.Grade
	FROM STUDENT AS st 
	JOIN GRADERESULT AS gra ON st.StudentId = gra.StudentId
	JOIN COURSE AS cour ON gra.CourseId = cour.CourseId
)T
PIVOT(
	MAX(Grade)
	FOR CLASS IN (
		Chiness,
		English,
		Math,
		Nature,
		Social
	)
)AS PIV
GO
--//other method
--Select stu.StuName, SUM(gds.Grade) as Score, RANK() over (Order by SUM(gds.Grade) Desc) as 'Rank', gds1.Grade as '國', gds2.Grade as '英', gds3.Grade as '數', gds4.Grade as '自然', gds5.Grade as '社會'
--From GRADERESULT as gds 
--	join STUDENT as stu on stu.StudentId = gds.StudentId
--	join (Select gds1.Grade, gds1.StudentId From GRADERESULT as gds1 where gds1.CourseId = 1) as gds1 on gds1.StudentId=gds.StudentId 
--	join (Select gds2.Grade, gds2.StudentId From GRADERESULT as gds2 where gds2.CourseId = 2) as gds2 on gds2.StudentId=gds.StudentId 
--	join (Select gds3.Grade, gds3.StudentId From GRADERESULT as gds3 where gds3.CourseId = 3) as gds3 on gds3.StudentId=gds.StudentId 
--	join (Select gds4.Grade, gds4.StudentId From GRADERESULT as gds4 where gds4.CourseId = 4) as gds4 on gds4.StudentId=gds.StudentId 
--	join (Select gds5.Grade, gds5.StudentId From GRADERESULT as gds5 where gds5.CourseId = 5) as gds5 on gds5.StudentId=gds.StudentId 
--Group by stu.StuName, stu.StudentId,gds1.Grade,gds2.Grade,gds3.Grade,gds4.Grade,gds5.Grade
--Order by 'Rank'

--situation1
CREATE TRIGGER CHECKGRAD
ON GRADERESULT
AFTER INSERT, UPDATE, DELETE
AS
BEGIN TRY
	PRINT('TRIGGER SATRT!')
	--//test
	--THROW 51000,'THROW ERROR!',1
	
END TRY
BEGIN CATCH
		RAISERROR('The Data Is Wrong.' ,14,10)
		ROLLBACK
END CATCH
GO

--situation2
CREATE TRIGGER CHECKCOURSE
ON COURSE
INSTEAD OF INSERT
AS
BEGIN TRY
	IF EXISTS (SELECT * FROM COURSE WHERE CourseName = (SELECT CourseName FROM inserted) )
	BEGIN
		UPDATE COURSE
		SET COURSE.CourseName = inserted.CourseName,
				COURSE.Address = inserted.Address,
				COURSE.Price = inserted.Price
		FROM COURSE JOIN inserted ON COURSE.CourseName = inserted.CourseName
		PRINT('END')
	END
END TRY
BEGIN CATCH 
	RAISERROR('Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror!' , 13, 1)
END CATCH
GO
--//test
--INSERT INTO COURSE(CourseName,Address)
--VALUES('Math','208')

CREATE TRIGGER CHECKSTUDENT
ON STUDENT
INSTEAD OF INSERT
AS
BEGIN 
	PRINT('TRIGGER SATRT!')
	IF @@ERROR != 0
	BEGIN 
		RAISERROR('The Data Is Wrong.' ,14,10)
		ROLLBACK
	END
END
GO
