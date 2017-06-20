var quiz = {

  questions: [
    {question: "On which Italian island is Palermo?", correct: "Sicily", all: ["Capri", "Stromboli", "Elba", "Sicily"]},
    {question: "What do the Japanese people call their own country?	?", correct: "Nippon", all: ["Nihon", "Wakoku", "Shijing","Nippon"]},
    {question: "Which river is flowing through Rome?", correct: "Tiber", all: ["Po", "Reno", "Arno", "Tiber"]},
    {question: "In which city was the Titanic built?", correct: "Belfast", all: ["Liverpool", "Lymington", "Southport", "Belfast"]},
    {question: "What was the former name of New York?", correct: "New Amsterdam", all: ["New London", "New Manchester", "New Humpshire", "New Amsterdam"]},
    {question: "Who is the director of Reservoir Dogs?", correct: "Quentin Tarantino", all: ["David Lee", "Stiven Spielberg", "Jim Jarmusch", "Quentin Tarantino"]},
    {question: "Which device was invented by Henry Mill?", correct: "The typewriter", all: ["Antibiotics", "Vacuum cleaner", "Neon light", "The typewriter"]},
    {question: "What is the name of the Barcelona football stadium?", correct: "Camp Nou", all: ["Emirates", "Santiago Bernabeu", "Mestalla", "Camp Nou"]},
    {question: "In which year did Maradona score a goal with his hand?", correct: "1986", all: ["1988", "1992", "1982","1986"]},
    {question: "Who was the Queen of Soul?", correct: "Aretha Franklin", all: ["Amy Winehause", "Whitney Houston", "Tina Turner", "Aretha Franklin"]},
    {question: "What is the lowest male voice?", correct: "Bass voice", all: ["Soprano", "Tenor", "Baritone", "Bass voice"]},
    {question: "What is the most famous university of Paris?", correct: "Sorbonne", all: ["University of Paris", "Le Cordon Bleu", "Paul Valery University", "Sorbonne"]},
    {question: "In what year was Google founded?", correct: "1996", all: ["1997", "1998", "1995", "1996"]},
    {question: "What is the official currency in Nepal??", correct: "Rupee", all: ["Real", "Yuan", "Won", "Rupee"]},
    {question: "What is the well known drink from Greece?", correct: "Ouzo", all: ["Rakia", "Caesar", "Maotai", "Ouzo"]},
  ],

   quizStart: document.getElementById('startScreen'),
   quizQuestion: document.getElementById('questionScreen'),
   quizEnd: document.getElementById('endScreen'),
   startBtn: document.getElementById('start'),
   questionBtns: document.querySelectorAll(".answerBtn"),
   nextBtn: document.getElementById('next'),
   questionText: document.getElementById('qText'),
   title: document.querySelector("#questionScreen h2"),
   startAgainBtn: document.querySelector("#endScreen button"),
   finalScore: document.querySelector("#endScreen p"),
   randomArr: [],
   clicked: [],
   confirmed: [],
   counter: 0,
   audio1: new Audio("milioner.wav"),
   guess: 0,

   init: function  () {
     //Dodavanje listener-a na klik na bilo koji odgovor
     for (var i = 0; i < this.questionBtns.length; i++) {
       this.questionBtns[i].addEventListener("click", this.color)
     }
     //Start (prelazak sa pocetnog na ekran sa pitanjima)
     this.startBtn.addEventListener('click', function() {
       this.quizStart.style.display = "none";
       this.quizQuestion.style.display = "block";
       this.showQuestion();
     }.bind(this));
     //Listener na next button
     this.nextBtn.addEventListener('click', this.nextPlease.bind(this));
     this.startAgainBtn.addEventListener('click', this.again.bind(this))
   },

   defaultColor: function() {
     for (var i = 0; i < quiz.questionBtns.length; i++) {
       quiz.questionBtns[i].style.backgroundColor = "#5bc0de";
     }
   },


   nextPlease: function() {
     this.confirmed.push(this.clicked.pop());
     this.clicked.length = 0;
     this.nextBtn.style.display = "none";
     if (this.counter < this.questions.length) {
       this.showQuestion();
       this.defaultColor();
     }
     else {
       this.score();
     }
   },

   color: function() {
     quiz.defaultColor();
     this.style.backgroundColor = "sandybrown";
     quiz.audio1.play();
     quiz.nextBtn.style.display = "block";
     quiz.nextBtn.innerHTML = "Confirm"
     quiz.clicked.push(this.innerHTML);
   },

   //Funkcija koja ispisuje pitanja i odgovore
   showQuestion: function() {
     this.title.innerHTML = "Question " + (this.counter + 1) + " out of 15";
     this.questionText.innerHTML = this.questions[this.counter].question;
     var displayRandom = Math.floor(Math.random() * this.questionBtns.length);
     if(this.randomArr.indexOf(displayRandom) === -1){
       this.randomArr.push(displayRandom);
       this.questionBtns[displayRandom].innerHTML = this.questions[this.counter].all[this.randomArr.length - 1];
     }
     if(this.randomArr.length < 4) {
       this.showQuestion();
     }
     else {
       this.counter++;
       this.randomArr.length = 0;
     }
   },

   score: function(){
     this.quizQuestion.style.display = "none";
     this.quizEnd.style.display = "block";
     //Koliko ima pogodjenih
     for (var i = 0; i < this.questions.length; i++) {
       if(this.confirmed[i] === this.questions[i].correct){
         this.guess++;
       }
     }
     if(this.guess < 5) {
       this.finalScore.innerHTML = "You guessed " + this.guess + " out of 15!" + "<br>" + "You were skipping classes obviously!";
     }
     else if(this.guess < 10){
       this.finalScore.innerHTML = "You guessed " + this.guess + " out of 15!" + "<br>" + "Not Bad!";
     }
     else {
       this.finalScore.innerHTML = "You guessed " + this.guess + " out of 15!" + "<br>" + "Well Done!";
     }
   },

   again: function() {
     this.counter = 0;
     this.showQuestion();
     this.quizEnd.style.display = "none";
     this.quizQuestion.style.display = "block";
     this.defaultColor();
     this.guess = 0;
   }
}


quiz.init();
