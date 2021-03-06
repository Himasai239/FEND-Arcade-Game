//declaration of variable for counting moves
let moves=0;
// Enemies our player must avoid
var Enemy = function Enemy(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 707) {
        this.x = -100;
        //var someSpeed  = Math.floor(Math.random() * 512);
    }
    var enemyLeftMax = this.x - 70;
    var enemyRightMax = this.x + 70;
    var enemyTopMax = this.y - 60;
    var enemyBottomMax = this.y + 60;
    if (player.x > enemyLeftMax && player.x < enemyRightMax && player.y > enemyTopMax && player.y < enemyBottomMax) {
      moves=0;
        alert("you lost")//when collides with enemy
        player.resetPosition();

    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function Enemy() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function renderEntities() {
    allEnemies.forEach(function(enemy) {
        enemy.render();
    });
    player.render();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function Player(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.y < 0) {
        this.y = 390;
        this.x = 200;
        
    } else if (this.x > 400) {
        this.x = 400
    } else if (this.y > 400) {
        this.y = 400;
    }
};

// function move(){
//   moves++;
  
// }

//To reset the position of the player when collision done

Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 390;
};

Player.prototype.render = function Enemy() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.x -= 50;
            break;
        case 'right':
            this.x += 50
            break;
        case 'up':
            this.y -= 40;
            break;
        case 'down':
            this.y += 40;
            break;
    }
    if(this.y<0){
      //for counting the moves
      moves++;
      console.log(moves);
      if(moves==3){
        //if player reaches water 3 times
        alert('You win')
        //if collides
        moves=0;
      }
    }
};

/*      if(this.x<0){
     this.x=0;
 }
 else if(this.y<0){
     this.y=390;
     this.x=200;
  }
  else if(this.x>400){
     this.x=400;
  }
  else if(this.y>400){
     this.y=400;
      this.x=200;
  }

         case 'left':
         this.x >= this.h_step ? this.x -= this.h_step : this.x -= 0;
         break; 
         case 'right':
         this.x <= (this.h_step *5 ) ? this.x += this.h_step : this.x += 0;
         break; 
         case 'up':
         this.y >= this.v_step ? this.y -= this.v_step : this.y -= 0;
         break; 
         case 'down':
        this.y <= (this.v_step *4 ) ? this.y += this.v_step : this.x += 0;
         break;             
     }
  };*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player(200, 380, 80);

var allEnemies = [];
var enemy = new Enemy(0, Math.floor(Math.random() * 222 + 1), Math.floor(Math.random() * 5));
const position = [60, 140, 230];

position.map((pos) => {
    enemy = new Enemy(0, pos, Math.floor(Math.random() * 300));
    allEnemies.push(enemy);
    //console.log(enemy);
})

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
})