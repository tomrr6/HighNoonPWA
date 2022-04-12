var pointsNeededToWin = 7;
var p1Points = 0;
var p2Points = 0;
var highNoonStart = null;
var p1ShootTime = null;
var p2ShootTime = null;
let shootAllowed = false;

$(document).ready(function(){
    startGame();
    
});

$('.scoreDot').click(function(){
    $(this).toggleClass('newlyFilled');
});

// p1 Win
$('#p1ShootButton').tap(function(){
    if(!shootAllowed){
        // p1Points--;
        alert('Player 1 misfire!😟');
        // updateScore();
        // resetScreen();
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
        // p2Points--;
        alert('Player 2 misfire!😟');
        // updateScore();
        // resetScreen();
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
$('.score').ready(function(){
    $('#p1Score').empty();
    $('#p2Score').empty();
    for(var i = 0; i < pointsNeededToWin; i++){
        $('#p1Score').append('<div class="scoreDot"></div>');
        $('#p2Score').append('<div class="scoreDot"></div>');
    }
    updateScore();
});

function updateScore(){
    console.log('p1 points: ' + p1Points);
    console.log('p2 points: ' + p2Points);
    
    for(var i = 0; i < p1Points; i++){
        $('#p1Score').children().eq(i).addClass('newlyFilled');
    }
    for(var i = 0; i < p2Points; i++){
        $('#p2Score').children().eq(i).addClass('newlyFilled');
    }
}

function resetScreen(){
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
    $('.newlyFilled').removeClass('newlyFilled').addClass('filled');
    setTimeout(function() {
        startGame();
    }, 50);
}

function startGame(){
    $('#p1TimeDisplay').text('');
    $('#p2TimeDisplay').text('');
    p1ShootTime = null;
    p2ShootTime = null;
    $('#waitForIt').removeClass('hidden');
    let highNoonDelay = Math.random() * 10000 + 3000;
    $(document).delay(highNoonDelay).queue(function(){
        highNoonStart = Date.now();
        shootAllowed = true;
        console.log('high noon: ' + highNoonStart);
        $('#waitForIt').addClass('hidden');
        $('#p1ShootButton').toggleClass('shootButtonReady');
        $('#p2ShootButton').toggleClass('shootButtonReady');
        $(this).dequeue();
    });
}