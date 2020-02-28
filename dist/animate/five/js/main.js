$(function () {
    $(".eleAnimate").on("click", "#mnKai", function () {
        k3v.tryPlay()
    });
    if (localStorage.getItem('___notAudio') === 'true') {
        $("#spanbtn").removeClass("soundsOn").addClass("soundsOff")
        postMessageToTop('___notAudio', true);
    } else {
        $("#spanbtn").removeClass("soundsOff").addClass("soundsOn");
        postMessageToTop('___notAudio', false);
    }
    $(".drawInfo").on("click", "#spanbtn", function () {
        if ("soundsOn" == $("#spanbtn").attr("class")) {
            localStorage.setItem('___notAudio', 'true');
            postMessageToTop('___notAudio', true);
            pauseAllSound();
            $("#spanbtn").removeClass("soundsOn").addClass("soundsOff")
            k3v.sound.stop("audioidB")
            k3v.sound.stop("audioidR")
        } else {
            localStorage.setItem('___notAudio', 'false');
            postMessageToTop('___notAudio', false);
            $("#spanbtn").removeClass("soundsOff").addClass("soundsOn");
            if ("b" == audioType) {
                k3v.sound.play("audioidB")
                k3v.sound.stop("audioidR")
                pauseSound('run');
                playSound('bg');
            } else {
                pauseSound('bg');
                playSound('run');
                k3v.sound.play("audioidR")
                k3v.sound.stop("audioidB")
            }
        }
    }), k3v.btnStyle()
});
var k3v = {},
    tryflag = !0,
    timer = null,
    audioType = "b",
    firth11Load = !0,
    ifopen = !1,
    animateId = {},
    dataStr = {
        preDrawCode: [2, 4, 6, 4, 5],
        sumNum: 12,
        sumBigSmall: "小",
        sumSingleDouble: "单",
        drawIssue: "170517061",
        preDrawTime: "2017-05-17 18:40:00"
    };
k3v.startGame = function (n) {
    var e = this;
    e.codePlay = function () {
        const dom = $(".codeNum").find("li");
        e.run(-154, 6, "0", dom);
        e.run(-1370, 4, "1", dom);
        e.run(-762, 10, "2", dom);
        e.run(-1522, 5, "3", dom);
        e.run(-2, 7, "4", dom)
    };
    e.run = function (top, e, index, dom) {
        const timer = setInterval(function () {
            $(dom).eq(index).css("backgroundPositionY", top + "px");
            if ((top += e) >= -2) {
                top = -1522;
            }
        }, e);
        animateId[index] = timer
    };
    n && e.codePlay();
    $(".linelist").find("li").addClass("redli");
    k3v.sound.stop("audioidB");
    k3v.sound.play("audioidR");
    pauseSound('bg');
    playSound('run');
    audioType = "r";
    k3v.bressBG(10);
}, k3v.stopGame = function (n, e, callback, isInit) {
    this.stop = function (n, a, isEnd = false) {
        if ("1" == e) {
            setTimeout(function () {
                clearInterval(animateId[n]);
                var e = $(".codeNum").find("li");
                $(e).eq(n).removeAttr("style"), $(e).eq(n).removeClass().addClass("num" + a);
                if (!isInit && isEnd) {
                    postMessageToTop('resetCallback', n);
                }
                if (!isInit && isEnd && typeof callback === 'function') {
                    callback(n);
                }
            }, 400 * n);
        } else if ("2" == e) {
            clearInterval(animateId[n]);
            let t = $(".codeNum").find("li");
            $(t).eq(n).removeAttr("style"), $(t).eq(n).removeClass().addClass("num" + a);
            if (!isInit && isEnd) {
                postMessageToTop('resetCallback', n);
            }
            if (!isInit && isEnd && typeof callback === 'function') {
                callback(n);
            }
        }
    };
    const maxIndex = 4;
    for (let a = 0; a <= maxIndex; a++) this.stop(a, n[a], a === maxIndex);
    audioType = "b";
    pauseSound('run');
    playSound('bg');
    k3v.sound.play("audioidB");
    k3v.sound.stop("audioidR");
};
var trytime = [];
k3v.btnStyle = function () {
    $(".animate").on("mousedown", "#mnKai", function () {
        $("#mnKai").addClass("mnKaiD")
    }), $(".animate").on("mouseup", "#mnKai", function () {
        $("#mnKai").removeClass("mnKaiD")
    })
}, k3v.tryPlay = function () {
    var n = [], e = $(".animate");
    if (tryflag) {
        $(e).find("#opening").text("开奖中..."), $(".noinfor").text("开奖中..."), $("#hourtxt").hide(), $("#opening").show(), tryflag = !1, k3v.startGame(!0);
        var a = setTimeout(function () {
            for (var e = 0; e < 5; e++) n.push(Math.round(5 * Math.random() + 1));
            k3v.stopGame(n, "1");
            var t = null;
            $("#hourtxt").fadeIn(), void 0 != animateId.bressBG && (clearInterval(animateId.bressBG), $(".manPic").find("span").eq(0).removeClass().addClass("manll"), $(".manPic").find("span").eq(1).removeClass().addClass("manrl"));
            var i = setTimeout(function () {
                for (var n = $(".codeArr").find("li"), e = [], a = 0; a < 5; a++) e.push($(n).eq(a).attr("class").split("code")[1]);
                k3v.stopGame(e, "2"), t = setTimeout(function () {
                    tryflag = !0
                }, 2e3), trytime.push(t)
            }, 8e3);
            trytime.push(a), trytime.push(i)
        }, 5e3)
    } else $(".noinfor").fadeIn(200, "", function () {
        setTimeout(function () {
            $(".noinfor").fadeOut("300")
        }, 1e3)
    })
}, k3v.playGame = function () {
    $("#opening").text("正在开奖..."), $("#hourtxt").hide(), $("#opening").show(), k3v.startGame(!0)
};
k3v.updateData = function (n) {
    // 期号
    // $("#drawIssue").text(n.drawIssue);
    // // 倒计时
    // $("#opening").text(n.drawTime);
    // // 号码
    // $(n.preDrawCode).each(function (n) {
    //     $(".codeArr").find("li").eq(n).removeClass().addClass("code" + this)
    // });
    // // 龙虎和
    // $(".codeArr").find("li").eq(5).find("span").eq(0).text(n.sumNum);
    // $(".codeArr").find("li").eq(5).find("span").eq(1).text(n.sumBigSmall);
    // $(".codeArr").find("li").eq(5).find("span").eq(2).text(n.sumSingleDouble);
};
k3v.cutTime = function (n) {
    null != timer && clearInterval(timer);
    var n = n;
    timer = setInterval(function () {
        if (n >= 1) {
            n -= 1;
            var e = Math.floor(n / 3600), a = Math.floor(n / 60 % 60), t = Math.floor(n % 60), i = "";
            if (i = (e < 10 ? "0" + e : e) + ":", i = i + "" + (a < 10 ? "0" + a : a) + ":" + (t < 10 ? "0" + t : t), $("#hourtxt").text(i), n < 10) {
                var s = $(".linelist").find("li");
                $(s).eq(n).addClass("redli")
            }
            n < 20 && (tryflag = !1, $(".noinfor").text("即将开奖"))
        } else $(".noinfor").text("正在开奖"), clearInterval(timer), k3v.playGame()
    }, 1e3)
}, k3v.clearTime = function () {
    clearInterval(timer)
}, k3v.startVideo = function (n) {
    k3v.sound.stop("audioidB"), k3v.sound.play("audioidR"), audioType = "r", k3v.updateData(n), k3v.stopGame(n.preDrawCode, "2"), k3v.cutTime(k3v.getSecond(n.preDrawTime)), setTimeout(function () {
        $(".animate").find(".loading").fadeOut(), firth11Load = !1
    }, 1e3)
}, k3v.getSecond = function (n) {
    var e = n.split(":"), a = e[0], t = e[1], i = e[2];
    return 3600 * (a = a < 10 ? a.substring(a.length - 1, a.length) : a) + 60 * (t = t < 10 ? t.substring(t.length - 1, t.length) : t) + 1 * (i = i < 10 ? i.substring(i.length - 1, i.length) : i)
}, k3v.sound = {
    play: function (n) {
        //"soundsOn" == $("#spanbtn").attr("class") && ifopen && document.getElementById(n).play()
    }, stop: function (n) {
        // document.getElementById(n).pause()
    }
}, k3v.stopVideo = function (n, callback, isInit) {
    k3v.stopGame(n.preDrawCode, 1, callback, isInit);
    if (n.preDrawTime) {
        setTimeout(function () {
            k3v.cutTime(k3v.getSecond(n.preDrawTime)), tryflag = !0
        }, 1e3);
    }
    k3v.updateData(n), $("#hourtxt").fadeIn(), void 0 != animateId.bressBG && (clearInterval(animateId.bressBG), $(".manPic").find("span").eq(0).removeClass().addClass("manll"), $(".manPic").find("span").eq(1).removeClass().addClass("manrl"))
}, k3v.bressBG = function (n) {
    var e = 1, a = !1;
    void 0 != animateId.bressBG && clearInterval(animateId.bressBG);
    var t = setInterval(function () {
        $(".bodybg").find("img").css({opacity: e}), a ? (e = 0, $(".manPic").find("span").eq(0).removeClass("manll").addClass("manlr"), $(".manPic").find("span").eq(1).removeClass("manrr").addClass("manrl"), a = !1) : (e = 1, $(".manPic").find("span").eq(1).removeClass("manrl").addClass("manrr"), $(".manPic").find("span").eq(0).removeClass("manlr").addClass("manll"), a = !0)
    }, 200);
    animateId.bressBG = t
};
