// 댓글이 생성될 위치를 설정합니다.
const innerSquare = document.getElementById("comments");

// 댓글이 생성되고 저장될 공간을 생성합니다.
let coordinates = [];

// 색상 10개 중 하나를 랜덤으로 고르는 것으로 설정했습니다.
// 색상 계열은 초록색 계열로 통일하였습니다.
const colors = [
    'e6ee9c', 'dce775', 'd4e157', 'cddc39', 'c0ca33', '7cb342', '8bc34a', '9ccc65', 'aed581', 'c5e1a5'
];

// 임시로 댓글을 작성한 사람을 5명으로 가정하였습니다. nicknames라는 배열에 댓글을 쓴 사람의 목록을 받아와야 할 거 같습니다.
// 현재 작업중인 노트북으로 원을 15개부터 작동이 되지 않습니다. 안전하게 최대 10개까지만 추가할 수 있도록 제한을 두는게 좋을거 같습니다.
let nicknames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

let commentSpace = 170;

// nicknames에 저장된 nickname 수 만큼 생성합니다.
for (let plusComment = 0; plusComment < nicknames.length; plusComment++) {
    // 새로운 div를 생성합니다.
    let randomDiv = document.createElement("div");
    let author = document.createElement("div");
    randomDiv.id = "comment";
    author.classList.add("nickname");

    // 랜덤 x, y 위치를 설정합니다.
    let x, y, colorCode;
    do {
        // 새로 생성된 div의 clientHeight, clientWidth의 길이를 받아올 수 없어 해당 길이/넓이와 margin을 직접 설정하였습니다.
        x = Math.random() * (innerSquare.clientWidth - commentSpace);
        y = Math.random() * (innerSquare.clientHeight - commentSpace);
    } while (overlaps(x, y));
    coordinates.push({x, y});

    // 각 댓글을 띄우는 원의 색상을 결정합니다.
    let cssStyle = getComputedStyle(randomDiv);
    let backgroundColor = cssStyle.backgroundColor;
    console.log(backgroundColor)
    if (randomDiv.style.backgroundColor == backgroundColor) {
        // 색상 10개 중 하나를 랜덤으로 선택합니다.
        let color = Math.floor(Math.random() * 9 + 1);
        colorCode = "#" + colors[color];
        randomDiv.style.backgroundColor = colorCode;
    }

    // 댓글들의 위치를 결정합니다.
    randomDiv.style.left = x + "px";
    randomDiv.style.top = y + "px";

    // 댓글들을 추가합니다.
    innerSquare.appendChild(randomDiv);
    randomDiv.appendChild(author);
    // nicknames 리스트에 저장되어 있던 nickname들을 배치합니다.
    author.innerText = nicknames[plusComment];
}

// 원끼리 겹치는지 확인하는 함수
function overlaps(x, y) {
    for (let i = 0; i < coordinates.length; i++) {
        let distance = Math.sqrt(Math.pow(coordinates[i].x - x, 2) + Math.pow(coordinates[i].y - y, 2));
        if (distance < commentSpace) {
            return true;
        }
    }
    return false;
}

let addComment = document.getElementById('addComment');
let check = 0;

check = checkNumofComment();

// 댓글이 몇개 달렸는지 확인하는 함수
function checkNumofComment() {
    if (nicknames.length == 10) {
        addComment.style.opacity = "0.5";
        addComment.style.cursor = "default";
        addComment.addEventListener('mouseover', function() {
            console.log(1);
            this.style.background = "#5094fc";
        })
        check = 1;
    }
    else {
        check = 0;
    }
    return check;
}

// 댓글을 달 수 있는지 여부의 버튼
function canPlusComment() {
    if (check == 0) {
        // 댓글을 다는 페이지로 연결되어야 합니다.
        // location.href="";
    }
    else {
        alert("댓글은 최대 10개까지 달 수 있습니다. 직접 마음을 전해보는 건 어떤가요??");
    }
}