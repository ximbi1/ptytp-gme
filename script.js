var player = document.getElementById('player');
var enemy1 = document.getElementById('enemy1');
var enemy2 = document.getElementById('enemy2');
var gameContainer = document.getElementById('game-container');

var playerWidth = player.offsetWidth;
var playerHeight = player.offsetHeight;
var enemyWidth = enemy1.offsetWidth;
var enemyHeight = enemy1.offsetHeight;

var playerX = gameContainer.offsetWidth / 2 - playerWidth / 2;
var playerY = gameContainer.offsetHeight / 2 - playerHeight / 2;

player.style.left = playerX + 'px';
player.style.top = playerY + 'px';

var enemy1X = Math.random() * (gameContainer.offsetWidth - enemyWidth);
var enemy1Y = Math.random() * (gameContainer.offsetHeight - enemyHeight);

enemy1.style.left = enemy1X + 'px';
enemy1.style.top = enemy1Y + 'px';

var enemy2X = Math.random() * (gameContainer.offsetWidth - enemyWidth);
var enemy2Y = Math.random() * (gameContainer.offsetHeight - enemyHeight);

enemy2.style.left = enemy2X + 'px';
enemy2.style.top = enemy2Y + 'px';

// funcionamiento raton

gameContainer.addEventListener('mousemove', function(event) {
    playerX = event.clientX - gameContainer.offsetLeft - playerWidth / 2;
    playerY = event.clientY - gameContainer.offsetTop - playerHeight / 2;

    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
});

setInterval(function() {
    var enemy1DX = playerX - enemy1.offsetLeft;
    var enemy1DY = playerY - enemy1.offsetTop;

    var enemy1Distance = Math.sqrt(enemy1DX * enemy1DX + enemy1DY * enemy1DY);

    var enemy1Speed = 6;
    var enemy1VX = enemy1DX / enemy1Distance * enemy1Speed;
    var enemy1VY = enemy1DY / enemy1Distance * enemy1Speed;

    enemy1.style.left = enemy1.offsetLeft + enemy1VX + 'px';
    enemy1.style.top = enemy1.offsetTop + enemy1VY + 'px';

    var enemy2DX = playerX - enemy2.offsetLeft;
    var enemy2DY = playerY - enemy2.offsetTop;

    var enemy2Distance = Math.sqrt(enemy2DX * enemy2DX + enemy2DY * enemy2DY);

    var enemy2Speed = 3;
    var enemy2VX = enemy2DX / enemy2Distance * enemy2Speed;
    var enemy2VY = enemy2DY / enemy2Distance * enemy2Speed;

    enemy2.style.left = enemy2.offsetLeft + enemy2VX + 'px';
    enemy2.style.top = enemy2.offsetTop + enemy2VY + 'px';

    if (collision(player, enemy1) || collision(player, enemy2)) {
        alert('Perdiste!');
        location.reload();
    }

    checkBoundaries(player);
}, 50);

function collision(player, enemy) {
    var playerRect = player.getBoundingClientRect();
    var enemyRect = enemy.getBoundingClientRect();

    return !(
        playerRect.right < enemyRect.left ||
        playerRect.left > enemyRect.right ||
        playerRect.bottom < enemyRect.top ||
        playerRect.top > enemyRect.bottom
    );
}

function checkBoundaries(element) {
    var x = element.offsetLeft;
    var y = element.offsetTop;
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (x < -width) {
        element.style.left = gameContainer.offsetWidth + 'px';
    } else if (x > gameContainer.offsetWidth) {
        element.style.left = -width + 'px';
    }

    if (y < -height) {
        element.style.top = gameContainer.offsetHeight + 'px';
    } else if (y > gameContainer.offsetHeight) {
        element.style.top = -height + 'px';
    }
}
// document.addEventListener('keydown', function(event) {
//     var player = document.getElementById('player');
//     var playerSpeed = 5;

//     if (event.keyCode === 37) { // flecha izquierda
//         player.style.left = (player.offsetLeft - playerSpeed) + 'px';
//     } else if (event.keyCode === 38) { // flecha arriba
//         player.style.top = (player.offsetTop - playerSpeed) + 'px';
//     } else if (event.keyCode === 39) { // flecha derecha
//         player.style.left = (player.offsetLeft + playerSpeed) + 'px';
//     } else if (event.keyCode === 40) { // flecha abajo
//         player.style.top = (player.offsetTop + playerSpeed) + 'px';
//     }
// });

// funcionamiento pantalla tactil
document.addEventListener("touchmove", function(event) {
  // Evita el comportamiento predeterminado de la pantalla táctil
  event.preventDefault();
  
  // Obtiene las coordenadas del toque
  var touchX = event.touches[0].clientX;
  var touchY = event.touches[0].clientY;
  
  // Mueve el personaje a las coordenadas del toque
  player.style.left = touchX + "px";
  player.style.top = touchY + "px";
});