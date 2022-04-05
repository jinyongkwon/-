$("#random-img").click(() => {
    test();
});
function test() {
    let random = Math.random();
    console.log(random); // 그냥 랜덤 메서드 돌릴 때 어떤 수가 나오는 지 확인

    if (random >= 0.5 && random < 1.0 == true) {
        alert("꽝");
    } else if (random >= 0.25 && random < 0.5 == true) {
        alert("html");
    } else if (random >= 0.1 && random < 0.25 == true) {
        alert("java");
    } else if (random >= 0.02 && random < 0.1 == true) {
        alert("JSP");
    } else if (random >= 0 && random < 0.02 == true) {
        alert("SpringBoot");
    }

}

let isTimer = false;
$("#present-img").click(() => {
    if (isTimer == false) {
        isTimer = true;
        console.log("start : " + isTimer);
        test();
        timer();
    }
});

let timer = () => {
    let time = 180;
    let min = 0;
    let sec = 0;
    let startTimer = setInterval(() => {
        min = parseInt(time / 60);
        sec = time % 60;
        console.log("middle : " + isTimer);

        $("#timer-text").val("무료 뽑기 까지 " + min + "분 " + sec + "초");
        time--
        if (time < 0) {
            clearInterval(startTimer);
            console.log("end : " + isTimer);
            $("#timer-text").val("무료 뽑기!!");
            isTimer = false;
        }
    }, 1000);
}
