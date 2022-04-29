var prevGameInMemory = true;

if (getCurrentGame() == null ||
    (getCurrentGame().p1Points == 0 && getCurrentGame().p2Points == 0)) {
    prevGameInMemory = false;
    $('#resumeGameButton').hide();
}

$('#resumeGameButton').click(function() {
    window.location.href = "https://tomrr6.github.io/HighNoonPWA/pages/game.html";
});
$('#vsHumanButton').click(function() {
    if (!prevGameInMemory || confirm('Are you sure you want to start a new game?\n\nYou will lose your current game.')) {
        createNewCurrentGame();
        updateSettings('vsCPU', false);
        window.location.href = "HighNoonPWA/pages/game.html";
    }
});
$('#vsCPUButton').click(function() {
    if (!prevGameInMemory || confirm('Are you sure you want to start a new game?\n\nYou will lose your current game.')) {
        createNewCurrentGame();
        updateSettings('vsCPU', true);
        window.location.href = "/HighNoonPWA/pages/game.html";
    }
});


//settings menu
$('#settingsButton').click(function() {
    if (!prevGameInMemory || confirm('Are you sure you want to go to the settings page?\n\nYou will lose your current game.')) {
        createNewCurrentGame();
        window.location.href = "./HighNoonPWA/pages/settings.html";
    }
});
$('#settings-reset-button').click(function() {
    resetSettings();
    window.location.reload();
});

//num to win
$('#numToWin-Setter').ready(function() {
    $('#numToWin-Setter').val(getSettings().pointsNeededToWin);
});
$('#numToWin-Setter').change(function() {
    if ($('#numToWin-Setter').val() < 1) {
        $('#numToWin-Setter').val(1);
    }
    updateSettings('pointsNeededToWin', $('#numToWin-Setter').val());
});

//early fires
$('#earlyFire-Setter').ready(function() {
    $('#earlyFire-Setter').prop('checked', getSettings().misfiresCheckedFor);
});
$('#earlyFire-Setter').change(function() {
    updateSettings('misfiresCheckedFor', $('#earlyFire-Setter').prop('checked'));
});

//leaderboard page ==----------------------------------------
$('#leaderboardButton').click(function() {
    alert('coming soon!');
});