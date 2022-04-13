var pointsNeededToWin = 3;
var p1Points = 0;
var p2Points = 0;
var highNoonStart = null;
var p1ShootTime = null;
var p2ShootTime = null;
let shootAllowed = false;
let highNoonTimeout = null;
let newlyFilledDotTimeout = null;

const vsCPU = true;
let CPUdelay = 5000;
const maxCPUdelay = 1000;

$(document).ready(function(){
    createScoreBoard();
    startGame();
});

$('.scoreDot').click(function(){
    $(this).toggleClass('newlyFilled');
});

// p1 Win
$('#p1ShootButton').tap(function(){
    if(!shootAllowed){
        if(p2Points < pointsNeededToWin-1){ //can't win from a misfire
            p2Points++;
            updateScore();
            alert('Player 1 misfire!😟\nOther player gets a point!');
            resetScreen();
        }
        else{
            alert('Player 1 misfire!😟');
            resetScreen(false);
        }
    }
    else if(p1ShootTime == null && shootAllowed){
        p1ShootTime = Date.now();
        console.log('p1 shoot: ' + p1ShootTime);
        console.log('p1 shoot - high noon: ' + (p1ShootTime - highNoonStart));
        $('#p1TimeDisplay').text((p1ShootTime - highNoonStart)/1000 +'s');

        if(p2ShootTime == null){
            p1Points ++;
            $('#p1ShootButton').removeClass('shootButtonReady');
            $('#p2ShootButton').removeClass('shootButtonReady');
        
            $('#p2ShootButton').addClass('loserButton');
            $('#p1ShootButton').addClass('winnerButton');
            $('#p1BoxingGlove').addClass('winActivated');
            $('#gameBG').addClass('p1Victory');
            setTimeout(function() {
                updateScore();
            }, 1000);

            setTimeout(function() {
                resetScreen();
            }, 5000);
        }
    }
});

$('#p2ShootButton').tap(function(){
    if(!shootAllowed){
        if(p1Points < pointsNeededToWin-1){ //can't win from a misfire
            p1Points++;
            updateScore();
            alert('Player 2 misfire!😟\nOther player gets a point!');
            resetScreen();
        }
        else{
            alert('Player 2 misfire!😟');
            resetScreen(false);
        }
    }
    else if (p2ShootTime == null && shootAllowed){
        p2ShootTime = Date.now();
        console.log('p2 shoot: ' + p2ShootTime);
        console.log('p2 shoot - high noon: ' + (p2ShootTime - highNoonStart));
        $('#p2TimeDisplay').text((p2ShootTime - highNoonStart)/1000 +'s');

        if(p1ShootTime == null){
            p2Points ++;

            $('#p1ShootButton').removeClass('shootButtonReady');
            $('#p2ShootButton').removeClass('shootButtonReady');

            $('#p1ShootButton').addClass('loserButton');
            $('#p2ShootButton').addClass('winnerButton');
            $('#p2BoxingGlove').addClass('winActivated');
            $('#gameBG').addClass('p2Victory');
            setTimeout(function() {
                updateScore();
            }, 1000);

            setTimeout(function() {
                resetScreen();
            }, 5000);
        }
    }
});

//create score boards
// $('.score').ready(function(){

function createScoreBoard(){
    $('#p1Score').empty();
    $('#p2Score').empty();
    for(var i = 0; i < pointsNeededToWin; i++){
        $('#p1Score').append('<div class="scoreDot" style="animation-delay: +'+ i*100 +'ms"></div>');
        $('#p2Score').append('<div class="scoreDot" style="animation-delay: +'+ i*100 +'ms"></div>');
    }
    updateScore();
}

function updateScore(){
    window.clearTimeout(newlyFilledDotTimeout);

    console.log('p1 points: ' + p1Points);
    console.log('p2 points: ' + p2Points);
    
    for(var i = 0; i < p1Points; i++){
        $('#p1Score').children().eq(i).addClass('newlyFilled');
    }
    for(var i = 0; i < p2Points; i++){
        $('#p2Score').children().eq(i).addClass('newlyFilled');
    }

    if(p1Points >= pointsNeededToWin){
        alert('Player 1 wins!');
        p1Points = 0;
        p2Points = 0;
        createScoreBoard();
        resetScreen();
        // window.location.reload();
    }
    else if(p2Points >= pointsNeededToWin){
        alert('Player 2 wins!');
        p1Points = 0;
        p2Points = 0;
        createScoreBoard();
        resetScreen();
        // window.location.reload();
    }

    newlyFilledDotTimeout = setTimeout(function(){
        $('.newlyFilled').removeClass('newlyFilled').addClass('filled');
    }, 2000);
}

function resetScreen(solidifyScore = true){
    window.clearTimeout(highNoonTimeout);
    shootAllowed = false;
    $('#p1ShootButton').removeClass('shootButtonReady');
    $('#p2ShootButton').removeClass('shootButtonReady');
    $('#p1ShootButton').removeClass('loserButton');
    $('#p2ShootButton').removeClass('loserButton');
    $('#p1ShootButton').removeClass('winnerButton');
    $('#p2ShootButton').removeClass('winnerButton');
    $('#p1BoxingGlove').removeClass('winActivated');
    $('#p2BoxingGlove').removeClass('winActivated');
    $('#gameBG').removeClass('p1Victory');
    $('#gameBG').removeClass('p2Victory');
    // if(solidifyScore){
    //     setTimeout(function(){
    //         $('.newlyFilled').removeClass('newlyFilled').addClass('filled');
    //     }, 1000);
    // }
    startGame();
}

function startGame(){
    
    if(vsCPU){
        CPUdelay = Math.random() * maxCPUdelay + 200;
    }

    $('#gameBG').addClass('waitingToShoot');
    $('#p1TimeDisplay').text('');
    $('#p2TimeDisplay').text('');
    p1ShootTime = null;
    p2ShootTime = null;
    $('#waitForIt').removeClass('hidden');
    
    let highNoonDelay = Math.random() * 10000 + 3000;
    highNoonTimeout = setTimeout(function() {
        highNoonStart = Date.now();
        $('#gameBG').removeClass('waitingToShoot');
        shootAllowed = true;

        if(vsCPU){
            setTimeout(function(){
                $('#p2ShootButton').trigger('tap');
            }, CPUdelay);
        }

        console.log('high noon: ' + highNoonStart);
        $('#waitForIt').addClass('hidden');
        $('#p1ShootButton').toggleClass('shootButtonReady');
        $('#p2ShootButton').toggleClass('shootButtonReady');
        $(this).dequeue();
    }, highNoonDelay);
}