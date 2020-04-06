JAVA檔案:ThirdTeamProject

<<<<<<< HEAD
一、
開啟Eclipse，Workspace直接選擇ThirdTeamProject


或是
二、
=======
>>>>>>> c132c00157fa956c1ec33df83fd87ffa5cd78664
直接	import>>General>>Projects from Folder or Archive>>next
	右上Directory選擇 ThirdTeamProject資料夾
	選擇 Servers(註1)和Valckth
	finish

註1:這是Tomcat的資料夾，不確定行不行，不行的話先自己建立Tomcat，
    並修改context.xml如下:
	<Context>
	<Resource
	  url="jdbc:sqlserver://localhost:1433;databaseName=Valckth"
	  driverClassName="com.microsoft.sqlserver.jdbc.SQLServerDriver"
	  username="sa"
*要改>>	  password="1qaz2wsx"
	  auth="Container"
	  type="javax.sql.DataSource"
	  name="connectSqlServerJdbc/Valckth"/>



	........</Context>
==============================================================
網頁如用其他IDE設計可放在根目錄下，搭配TempCSS和TempJS，設計好之後再丟進WebContainer

==========
valckth是我挑七個人的名字亂取的(七大醉?)，以後配合好聽的專案名字做修改