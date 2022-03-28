let regex = /[^0-9]/g; //숫자만 추출하기 위한 정규식.
let isAttack = false; // 공격중인지 체크
let isSkil = false; // 스킬공격중인지 체크.
let isUserAttack = false; // user가 공격인지 체크
let isMonsterAttack = false; // monster가 공격인지 체크
let User = {
    name: $("#user-name").val(),
    power: $("#user-power").val(),
    Skil: {
        name: "배치기",
        demage: Math.floor($("#user-power").val() * 2.5),
        usehp: 0 // 스킬 사용HP 초기화시켜놓은것.
    },

}
let Monster = {
    name: $("#monster-name").val(),
    power: $("#monster-power").val()
}

function rand() { // 1~4사이의 랜덤함수 생성
    return Math.floor(Math.random() * 4) + 1;
}

function userStartHp() { // 처음 순수 숫자 user hp
    let userStartHp = $("#user-starthp").val();
    let userHp = userStartHp.replace(regex, '');
    return userHp;
}

function monsterStartHp() { // 처음 순수 숫자 user hp
    let monsterStartHp = $("#monster-starthp").val();
    let monsterHp = monsterStartHp.replace(regex, '');
    return monsterHp;
}

function userHp() { // 실시간 순수 숫자 user hp
    let userTextHp = $("#user-texthp").val();
    let userHp = userTextHp.replace(regex, '');
    return userHp;
}

function monsterHp() { // 실시간 순수 숫자 monster hp
    let monsterTextHp = $("#monster-texthp").val();
    let monsterHp = monsterTextHp.replace(regex, '');
    return monsterHp;
}

function demageHp() { // hpbar가 hp에 비례해서 깎임.
    if (isSkil == false) {
        if (isUserAttack == true) {
            let demage = User.power / monsterStartHp() * 100
            console.log(demage);
            $("#monster-hpbar").animate({ width: `-=${demage}%` }, 900);
        } else if (isMonsterAttack == true) {
            let demage = Monster.power / userStartHp() * 100
            console.log(demage);
            $("#user-hpbar").animate({ width: `-=${demage}%` }, 900);
        }
    }
    if (isSkil == true) {
        if (isUserAttack == true) {
            let skilUseDemage = User.Skil.usehp / userStartHp() * 100
            console.log(skilUseDemage);
            $("#user-hpbar").animate({ width: `-=${skilUseDemage}%` }, 900);
            let demage = User.Skil.demage / monsterStartHp() * 100
            console.log(demage);
            $("#monster-hpbar").animate({ width: `-=${demage}%` }, 900);
        } else if (isMonsterAttack == true) {
            let demage = Monster.power / userStartHp() * 100
            console.log(demage);
            $("#user-hpbar").animate({ width: `-=${demage}%` }, 900);
        }
    }
}

function hpText() { // hp의 값을 변경해줌.
    if (isSkil == false) {
        if (isUserAttack == true) {
            let monsterDemageHp = monsterHp() - User.power;
            if (monsterDemageHp < 0) {
                $("#monster-texthp").val(`HP : 0`);
            } else {
                $("#monster-texthp").val(`HP : ${monsterDemageHp}`);
            }
        } else if (isMonsterAttack == true) {
            let userDemageHp = userHp() - Monster.power;
            if (userDemageHp < 0) {
                $("#user-texthp").val(`HP : 0`);
            } else {
                $("#user-texthp").val(`HP : ${userDemageHp}`);
            }
        }
    }
    if (isSkil == true) {
        if (isUserAttack == true) {
            let userUseSkilAfterHp = userHp() - User.Skil.usehp;
            $("#user-texthp").val(`HP : ${userUseSkilAfterHp}`);
            let monsterDemageHp = monsterHp() - User.Skil.demage;
            if (monsterDemageHp < 0) {
                $("#monster-texthp").val(`HP : 0`);
            } else {
                $("#monster-texthp").val(`HP : ${monsterDemageHp}`);
            }
        } else if (isMonsterAttack == true) {
            let userDemageHp = userHp() - Monster.power;
            if (userDemageHp < 0) {
                $("#user-texthp").val(`HP : 0`);
            } else {
                $("#user-texthp").val(`HP : ${userDemageHp}`);
            }
        }
    }
}

function hitText() { // 몬스터와 캐릭터가 한 행동을 text로 뛰워줌.
    if (isSkil == false) { // 기본공격
        if (isUserAttack == true) {
            $("#textbox").prepend(`${User.name}이(가) ${Monster.name}에게 ${User.power} 데미지를 주었습니다.\n`);
            if (monsterHp() == 0) {
                $("#textbox").prepend(`${User.name}이(가) ${Monster.name}을 쓰러뜨렸습니다.\n`);
            }
        } else if (isMonsterAttack == true) {
            $("#textbox").prepend(`${Monster.name}이(가) ${User.name}에게 ${Monster.power} 데미지를 주었습니다.\n`);
            if (userHp() == 0) {
                $("#textbox").prepend(`${User.name}이(가) ${name}에게 패배하였습니다.\n`);
            }
        }
    }
    if (isSkil == true) { // 스킬 공격
        if (isUserAttack == true) {
            $("#textbox").prepend(`${User.name}이(가) HP${User.Skil.usehp}을 소모해 ${rand()}번 스킬 ${User.Skil.name}을(를) 사용하였습니다.\n`);
            $("#textbox").prepend(`${User.name}이(가) ${Monster.name}에게 ${User.Skil.demage} 데미지를 주었습니다.\n`);
            if (monsterHp() == 0) {
                $("#textbox").prepend(`${User.name}이(가) ${Monster.name}을 쓰러뜨렸습니다.\n`);
            }
        } else if (isMonsterAttack == true) {
            $("#textbox").prepend(`${Monster.name}이(가) ${User.name}에게 ${Monster.power} 데미지를 주었습니다.\n`);
            if (userHp() == 0) {
                $("#textbox").prepend(`${User.name}이(가) ${Monster.name}에게 패배하였습니다.\n`);
            }
        }
    }
}

function attack() { // 몬스터와 캐릭터를 공격시킴
    let userLeft = $("#user-image").position().left;
    let userWidth = $("#user-image").width();
    let userRightX = userLeft + userWidth;
    let monsterLeftX = $("#monster-image").position().left;
    let moveX = monsterLeftX - userRightX + 70;
    User.Skil.usehp = Math.floor(userHp() * 0.03); // 스킬을 사용할때 현재 체력의 비례해 스킬사용
    if (userHp() != 0 && monsterHp() != 0) { // user의 피나 monster의 피가 0이 아닐경우에만 실행
        $("#user-image").animate({ left: moveX }, 1000, () => {
            isUserAttack = true;
            hpText();
            demageHp();
            hitText();
        });
        $("#user-image").animate({ left: '70' }, 900, () => {
            isUserAttack = false;
            if (monsterHp() != 0) {// monster의 피가 0이 아닐경우에만 실행(0이되면 공격x)
                $("#monster-image").animate({ right: moveX }, 900, () => {
                    isMonsterAttack = true;
                    hpText();
                    demageHp();
                    hitText();
                });
                $("#monster-image").animate({ right: '70px' }, 900, () => {
                    isMonsterAttack = false;
                    isAttack = false; // 공격끝
                    isSkil = false; // 스킬끝
                });
            }
        });
    }
}

$("#btn-attack").click((event) => {
    if (isAttack == false && isSkil == false) {
        isAttack = true; // 공격시작
        attack();
    }
});

$("#btn-skil").click((event) => {
    if (isAttack == false && isSkil == false) {
        isSkil = true; // 스킬시작
        attack();
    }
});