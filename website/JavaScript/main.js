//p1==============
function f1() {
    for (var i = 1; i < 10; i++) {
        document.write("<tr>");
        for (var j = 2; j < 10; j++) {
            document.write("<td>");
            document.write(j + "*" + i + "=" + j * i);
            document.write("</td>");
        }
        document.write("</r>");
    }
}
//p2==============
function p2() {
    var chinesscode = new RegExp(/[\u4e00-\u9fff]/);
    var pwdCKcode = new RegExp(/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d].{5,}/);
    var date1code = new RegExp(/(\d{4})[/](\d{2})[/](\d{2})/);
    var u_img_right = "images/Right.png"; u_img_wrong = "images/Wrong.png";
    var t_r = "正確", t_w = "錯誤";
    var corrName = 0, corrPwd = 0, corrDate = 0;

    var checkName = function () {
        var img_ckname = document.getElementById("img_ckname");
        var t_ckname = document.getElementById("t_ckname");
        img_ckname.style.visibility = "visible";
        if (this.value.length > 1 && chinesscode.test(this.value)) {
            img_ckname.src = u_img_right;
            t_ckname.innerHTML = t_r;
            corrName = 1;
        }
        else {
            img_ckname.src = u_img_wrong;
            t_ckname.innerHTML = t_w;
            corrName = 0;
        }
    }
    var checkpwd = function () {
        var img_ckpwd = document.getElementById("img_ckpwd");
        var t_ckpwd = document.getElementById("t_ckpwd");
        img_ckpwd.style.visibility = "visible";
        if (pwdCKcode.test(this.value)) {
            img_ckpwd.src = u_img_right;
            t_ckpwd.innerHTML = t_r;
            corrPwd = 1;
        }
        else {
            img_ckpwd.src = u_img_wrong;
            t_ckpwd.innerHTML = t_w;
            corrPwd = 0;
        }
    }
    var checkdate = function () {
        var img_ckdate = document.getElementById("img_ckdate");
        var t_ckdate = document.getElementById("t_ckdate");
        img_ckdate.style.visibility = "visible";
        if (date1code.test(this.value)) {
            var date = this.value.split("/");
            switch (parseInt(date[1])) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    if (date[2] <= 31) {
                        img_ckdate.src = u_img_right;
                        t_ckdate.innerHTML = t_r;
                        corrDate = 1;
                    } else {
                        img_ckdate.src = u_img_wrong;
                        t_ckdate.innerHTML = t_w;
                        corrDate = 0;
                    }
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if (date[2] <= 30) {
                        img_ckdate.src = u_img_right;
                        t_ckdate.innerHTML = t_r;
                        corrDate = 1;
                    }
                    break;
                case 2:
                    if (date[0] % 400 == 0 || (date[0] % 100 != 0 && date[0] % 4 == 0)) {
                        if (date[2] <= 29) {
                            img_ckdate.src = u_img_right;
                            t_ckdate.innerHTML = t_r;
                            corrDate = 1;
                        } else {
                            img_ckdate.src = u_img_wrong
                            t_ckdate.innerHTML = t_w;;
                            corrDate = 0;
                        }
                    } else {
                        if (date[2] <= 28) {
                            img_ckdate.src = u_img_right;
                            t_ckdate.innerHTML = t_r;
                            corrDate = 1;
                        } else {
                            img_ckdate.src = u_img_wrong;
                            t_ckdate.innerHTML = t_w;
                            corrDate = 0;
                        }
                    }
                    break;
                default:
                    img_ckdate.src = u_img_wrong;
                    t_ckdate.innerHTML = t_w;
                    corrDate = 0;
                    break;
            }
        }
        else {
            img_ckdate.src = u_img_wrong;
            t_ckdate.innerHTML = t_w;
            corrDate = 0;
        }
    }
    var com = function () {
        if (corrDate == 1 && corrName == 1 && corrPwd == 1) {
            form1.submit();
            alert("Complete.");
        }
        else
            alert("Please Check The Data Again.");
    }
    document.getElementById("userName").onblur = checkName;
    document.getElementById("pwd").onblur = checkpwd;
    document.getElementById("date1").onblur = checkdate;
}
//p3==============
function p3() {
    //creat stars
    var divbackstar = document.getElementById("divbackstar");
    var divfrontstar = document.getElementById("divfrontstar");

    for (var i = 0; i < 5; i++) {
        var starimg = document.createElement("img");
        starimg.id = 'star' + i;
        starimg.className = "star";
        starimg.src = "images/Star.png";
        starimg.alt = "star";
        starimg.title = "star" + i;
        starimg.style.display = "none";
        starimg.onmouseout = starHidden;
        starimg.onmousedown = end;
        divfrontstar.appendChild(starimg);
    }
    for (var i = 0; i < 5; i++) {
        var starimg = document.createElement("img");
        starimg.id = 'bstar' + i;
        starimg.className = "bstar";
        starimg.src = "images/Starblock.png";
        starimg.alt = "star";
        starimg.title = "bstar" + i;
        starimg.addEventListener("", starShow);
        starimg.onmouseover = starShow;
        divbackstar.appendChild(starimg);
    }
    document.getElementById("starreset").onclick = resetbtn
}
function resetbtn() {
    score = 0;
    for (var i = 4; i >= 0; i--) {
        document.getElementById("star" + i).style.display = "none";
        document.getElementById("star" + i).onmouseout = starHidden;
        document.getElementById("bstar" + i).onmouseover = starShow;
        document.getElementById("score").innerHTML = "評分中..." + score;
    }
}
var score;
var starShow = function () {
    var bstarid = document.getElementById(this.id).id;
    for (var i = bstarid.charAt(5); i >= 0; i--) {
        score = parseInt(bstarid.charAt(5)) + 1;
        document.getElementById("star" + i).style.display = "initial";
        document.getElementById("score").innerHTML = "評分中..." + score;
    }
}
var starHidden = function () {
    var starid = document.getElementById(this.id).id;
    for (var i = 4; i >= 0; i--) {
        document.getElementById("star" + i).style.display = "none";
    }
    document.getElementById("score").innerHTML = "評分中..." + 0;
}
var end = function () {
    document.getElementById("score").innerHTML = "你給了" + score + "顆星!";
    for (var i = 4; i >= 0; i--) {
        document.getElementById("star" + i).onmouseout = "";
        document.getElementById("bstar" + i).onmouseover = "";
    }
}


//p4===================
//configuration

function p4() {
    var btn_bgcolor = "yellow", btn_ckcolor = "red";
    var i_imgNumber = 7;
    //main==========================
    var conimg = document.querySelector("#control").querySelectorAll("img");
    var compose = document.querySelector(".compose");
    var composeimgs = compose.querySelectorAll("img");
    var arrNum = [0, 1, 2];
    var playflag = false;
    var goplay;
    var url_actionImg = [];
    for (var i = 0; i < i_imgNumber; i++) {
        url_actionImg[i] = "images/Desktop-Background-" + i + ".jpg";
    }
    var aherf = ["http://www.yahoo.com.tw", "http://www.apple.com", "http://www.pchome.com.tw",
        "http://www.microsoft.com", "http://www.youtube.com", "http://www.taipei.gov.tw",
        "http://www.facebook.com"]
    //numberList===============
    var img_action = document.getElementById("img_action");
    var numberList = document.getElementById("numberList");
    var numwidth = 600 / i_imgNumber;
    for (var i = 0; i < i_imgNumber; i++) {
        var atag = document.createElement("a");
        atag.innerHTML = i + 1;
        atag.style.width = (numwidth - 7) + "px";
        atag.style.backgroundImage = 'url("images/listbg.png")';
        atag.addEventListener("mouseover", function () {
            this.style.backgroundImage = 'url("images/listbg1.png")'
        })
        atag.addEventListener("mouseout", function () {
            this.style.backgroundImage = 'url("images/listbg.png")'
        })
        atag.addEventListener("mousedown", function () {
            arrNum[1] = this.text - 1;
            arrNum[0] = arrNum[1] - 1;
            arrNum[2] = arrNum[1] + 1;
            for (var i = 0; i < 3; i++) {
                if (arrNum[i] < 0) {
                    arrNum[i] = i_imgNumber - 1;
                }
            }
            for (var i = 0; i < 3; i++) {
                if (arrNum[i] >= i_imgNumber) {
                    arrNum[i] = 0;
                }
            }

            stopplay();
            checkplaybtn();
            showMainImg();
        })
        numberList.appendChild(atag);
    }
    var tagalist = document.querySelector(".numberList").querySelectorAll("a");
    var img_a = document.querySelector(".maindiv").querySelectorAll("a");
    //=========motion
    function showMainImg() {
        for (let i = 0; i < 3; i++) {
            composeimgs[i].src = url_actionImg[arrNum[i]];

        }
        for (var i = 0; i < i_imgNumber; i++) {
            tagalist[i].style.border = "3px solid white";
        }
        tagalist[arrNum[1]].style.border = "3px solid orangered";
        img_a[1].href = aherf[arrNum[1]];
    }
    function startplay() {
        goplay = setInterval(nextbtnF, 2000);
    }
    function stopplay() {
        clearInterval(goplay);
        playflag = false;
    }
    function nextbtnF() {
        calNumber("+");

        for (let i = 0; i < 3; i++) {
            composeimgs[i].style.animation = "moveleft 1s ease 1";
            composeimgs[i].addEventListener("animationend", function () {
                showMainImg();
                this.style.animation = "";
            })
        }
    }
    function prebtnf() {
        calNumber("-");
        for (let i = 0; i < 3; i++) {
            composeimgs[i].style.animation = "moveright 1s ease 1";
            composeimgs[i].addEventListener("animationend", function () {
                showMainImg();
                this.style.animation = "";
            })
        }
        //showMainImg();
    }
    function btnplay() {
        playflag = false;
        conimg[1].src = "images/play.png";
        conimg[1].onmouseover = function () {
            conimg[1].src = "images/play1.png";
        }
        conimg[1].onmouseout = function () {
            conimg[1].src = "images/play.png";
        }
        conimg[1].onmousedown = function () {
            conimg[1].style.borderRadius = "50%"
            conimg[1].style.backgroundColor = btn_ckcolor;
            conimg[1].src = "images/play1.png";
            startplay();

        }
        conimg[1].onmouseup = function () {
            conimg[1].style.backgroundColor = btn_bgcolor;
            checkplaybtn();
        }
    }
    function btnpause() {
        playflag = true;
        conimg[1].src = "images/pause.png";
        conimg[1].onmouseover = function () {
            conimg[1].src = "images/pause1.png";
        }
        conimg[1].onmouseout = function () {
            conimg[1].src = "images/pause.png";
        }
        conimg[1].onmousedown = function () {
            conimg[1].style.borderRadius = "50%"
            conimg[1].style.backgroundColor = btn_ckcolor;
            conimg[1].src = "images/pause1.png";
            stopplay();

        }
        conimg[1].onmouseup = function () {
            conimg[1].style.backgroundColor = btn_bgcolor;
            checkplaybtn();
        }
    }
    function checkplaybtn() {
        if (playflag) {
            btnpause();
        }
        else {
            btnplay();
        }
        playflag = !playflag;
    }
    function calNumber(x) {
        if (x == "-") {
            for (var i = 0; i < 3; i++) {
                arrNum[i]--;
                if (arrNum[i] < 0) {
                    arrNum[i] = i_imgNumber - 1;
                }
            }
        } else if (x == "+") {
            for (var i = 0; i < 3; i++) {
                arrNum[i]++;
                if (arrNum[i] >= i_imgNumber) {
                    arrNum[i] = 0;
                }
            }
        }
    }

    //buttonset==========================================
    showMainImg();
    startplay();
    //prebtn
    conimg[0].addEventListener("mouseover", function () {
        this.src = "images/backward1.png";
    })
    conimg[0].addEventListener("mouseout", function () {
        this.src = "images/backward.png";
    })
    conimg[0].addEventListener("mousedown", function () {
        this.style.borderRadius = "50%"
        this.style.backgroundColor = btn_ckcolor;
        stopplay();
        prebtnf();
    })
    conimg[0].addEventListener("mouseup", function () {
        this.style.backgroundColor = btn_bgcolor;
        checkplaybtn();
    })
    //playbtn
    conimg[1].onmouseover = function () {
        conimg[1].src = "images/pause1.png";
    }
    conimg[1].onmouseout = function () {
        conimg[1].src = "images/pause.png";
    }
    conimg[1].onmousedown = function () {
        conimg[1].style.borderRadius = "50%"
        conimg[1].style.backgroundColor = btn_ckcolor;
        conimg[1].src = "images/pause1.png";
        stopplay();
    }
    conimg[1].onmouseup = function () {
        conimg[1].style.backgroundColor = btn_bgcolor;
        checkplaybtn();
    }
    //nextbtn
    conimg[2].addEventListener("mouseover", function () {
        this.src = "images/forwards1.png";
    })
    conimg[2].addEventListener("mouseout", function () {
        this.src = "images/forwards.png";
    })
    conimg[2].addEventListener("mousedown", function () {
        this.style.borderRadius = "50%"
        this.style.backgroundColor = btn_ckcolor;
        nextbtnF();
        stopplay();
    })
    conimg[2].addEventListener("mouseup", function () {
        this.style.backgroundColor = btn_bgcolor;
        checkplaybtn();
    })
}

// p5===========
var p5 = function () {
    var year = document.getElementById("year");
    var mon = document.getElementById("mon");
    var day = document.getElementById("day");
    var t_detail = document.getElementById("t_detail");
    var maxdays;
    for (var i = 2010; i <= 2020; i++) {
        var years = document.createElement("option");
        years.innerHTML = i;
        years.value = i;
        year.appendChild(years);
    }
    for (var i = 1; i < 13; i++) {
        var mons = document.createElement("option");
        mons.innerHTML = i;
        mons.value = i;
        mon.appendChild(mons);
    }
    for (var i = 1; i <= 31; i++) {
        var days = document.createElement("option");
        days.innerHTML = i;
        days.value = i;
        day.appendChild(days);
    }

    function createdays() {
        switch (parseInt(mon.value)) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                maxdays = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                maxdays = 30
                break;
            case 2:
                if (year.value % 400 == 0 || (year.value % 100 != 0 && year.value % 4 == 0)) {
                    maxdays = 29;
                } else {
                    maxdays = 28;
                }
                break;
        }
        var run = true;
        while (run) {
            var dayOp = document.querySelector("#day").querySelectorAll("option");
            if (dayOp.length > maxdays) {
                for (var i = dayOp.length; i > maxdays; i--) {
                    day.removeChild(dayOp[i - 1]);
                }
            } else if (dayOp.length < maxdays) {
                for (var i = dayOp.length; i < maxdays; i++) {
                    var days = document.createElement("option");
                    days.innerHTML = i + 1;
                    days.value = days.innerHTML;
                    day.appendChild(days);
                }
            } else if (dayOp.length == maxdays) {
                run = false;
            }
        }
    }

    var ref = function () {
        t_detail.innerHTML = "您選擇的日期是" + year.value + "年" + mon.value + "月" + day.value + "日";
    }
    mon.onchange = createdays;
    year.onchange = createdays;
    mon.addEventListener("change", ref);
    year.addEventListener("change", ref);
    day.addEventListener("change", ref);
}

//decorate
function index() {
    mainbtn = document.getElementsByClassName("mainbtn");
   
    for (let i = 0; i < mainbtn.length; i++) {
        console.log("==========123" + mainbtn);
        mainbtn[i].addEventListener("mousedown", function () {
            for (let j = 1; j <= mainbtn.length; j++) {
                console.log('"p' + (j+1) + '"');
                console.log(document.getElementsByClassName('"p' + (j+1) + '"'));
                console.log(document.getElementsByClassName("p1"));
                document.getElementsByClassName("p" + j)[0].style.display = "none";
            }
            document.getElementsByClassName("p" + (i+1))[0].style.display = "initial";

        })
    }
}

//////////////////////////
window.onload = function(){
    var demo = document.getElementById("bkindex");
        x = document.documentElement.clientWidth - demo.offsetWidth-20;
        y = document.documentElement.clientHeight - demo.offsetHeight-20;
        demo.style.left = x + 'px';
        demo.style.top = y + 'px';
}