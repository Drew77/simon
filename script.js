var sequence = [];
var score = 0;
var bestscore = 0;
var gameOn = false;
var playersturn = false;
var playerSequence = [];
var sections = ['topleft', 'topright', 'bottomleft', 'bottomright'];

var sounds = {
    'topleft': new Howl({
      src: ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'],
      html5: true
    }),
    'topright': new Howl({
      src: ['https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'],
      html5: true
    }),
    'bottomleft': new Howl({
      src: ['https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'],
      html5: true
    }),
    'bottomright': new Howl({
      src: ['https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'],
      html5: true
    }),
};


// attach event handlers
$('#go').on('click', function(){
	if (!gameOn){
		gameOn = true;
		init();
	}
})


// Avoid clicking on the circle being taken as a click through to section below
$('.circle').on('click', function(event) {
	event.stopPropagation();
});

$('#reset').on('click', function(){
	gameOn = false;
	init();
})

$('.section').on('click', function(e){
	if (playersturn){
		var id = e.target.id
		playerSequence.push(id);
		sounds[id].play();
		check();
	}

});


// an array of 20 sections
function makeRandomOrder(){
	var output = [];
	for (var i = 0; i < 20 ; i++){
		output.push(sections[Math.floor(Math.random()*4)]);
	}
	return output;
}

// setup game

function init(){ // sets up game 
	sequence = makeRandomOrder();
	score = 0;
	$("#score").text('Score: ' + score);
	play();
}

function play(){
	if (gameOn){
		displaySequence();		
	}


}

function displaySequence(){
	var i = 0;
	var timer = setInterval(function(){
		animation(i);
		i++;
		if (i > score){
			clearInterval(timer);
			playersturn = true;
			playerSequence = [];
			}
		}, 1000);
	
	
}

function animation(i){
		var section = '#' + sequence[i];
		sounds[sequence[i]].play();
		setTimeout(function(){
			 $(section).css({'opacity' : '0.5',
							  'border' : 'solid 10px black'});
		}, 200);
				setTimeout(function(){
			 $(section).css({'opacity' : '1',
							  'border' : 'none'});
		},  500);
				

}

function check(){
	var picked = playerSequence[playerSequence.length - 1];
	var colour = $('#' + picked).css('background');
	if (picked !== sequence[playerSequence.length - 1]){
		$('#' + picked).css('background', 'black');
		gameOn = false;
		setTimeout(function(){
			 $('#' + picked).css('background', colour);
		}, 300);
		if (score > bestscore){
		bestscore = score;
		$("#best").text('Best Score: ' + bestscore);
		}
		score = 0;
		init();

	}
	else {
		setTimeout(function(){
			 $('#' + picked).css('opacity', '0.3');
		}, 50);
		setTimeout(function(){
			 $('#' + picked).css('opacity', '1');
		}, 100);
	}
	if (playerSequence.length === score + 1){
		score ++;
		$("#score").text('Score: ' + score);
		playersturn = false;

		play();
	}
	
	

}
