(function () {
  "use strict";

  var score = 0;
  var currentQuestionIndex = 0;
  var radius = 50;
  var questions = [
    {
      question: "What cafe is right next to the Seal?",
      answer: "Mishka's Cafe",
      hint: "Now walk to the Farmers Market area @ Central Park", 
      latitude: 38.54326100100469, 
      longitude: -121.74017255811914
    },
    {
      question: "What day of the weekend does the Farmer's Market take place?",
      answer: "Saturday",
      hint: "Next, explore the Quad and find the iconic Memorial Union.", 
      latitude: 38.544736565941356, 
      longitude: -121.74399958858902
    },
    {
      question: "Which main game do people play in the MU Games Area?",
      answer: "bowling",
      hint: "Visit 254 Old Davis Rd and explore the area", 
      latitude: 38.54216823439749, 
      longitude: -121.74963817130956
    },
    {
      question: "Which museum at UC Davis features an extensive collection of art and hosts various exhibitions throughout the year?",
      answer: "Manetti Shrem Museum",
      hint: "Head to campus and go to the Silo. Explore the area.", 
      latitude: 38.533676456793835, 
      longitude: -121.74791664647175
    },
    {
      question: "What is the most popular food truck near the Silo?",
      answer: "Shah's Halal Food",
      hint: "Head to the Mondavi Center for the Performing Arts and enjoy a live performance.", 
      latitude: 38.53838371986195,
      longitude: -121.75246932708652
    }, 

    {
      question: "What is the official nickname of Davis, CA?",
      answer: "City of Bicycles",
      hint: "Known for its bike-friendly culture"
    },

    {
      question: "What is the name of the iconic structure located in the center of Davis, known for its distinctive design?",
      answer: "Davis Community Church",
      hint: "Head to 412 C Street", 
      latitude: 38.54640622155144, 
      longitude: -121.7439895751015
    },

    
  ];

  function showQuestionDialog(question) {
    var questionTextElement = document.getElementById("questionText");
    var answerInput = document.getElementById("answerInput");
    var modal = document.getElementById("questionModal");
    var submitButton = document.getElementById("submitAnswerButton");

    questionTextElement.textContent = question.question;
    answerInput.value = "";

    modal.style.display = "block";


    submitButton.addEventListener("click", function () {
      var userAnswer = answerInput.value.trim().toLowerCase();
      var answer = question.answer.toLowerCase();

      if (userAnswer === answer) {
        score++;
        expand();
        document.getElementById("score").textContent = score;

        if (currentQuestionIndex < questions.length - 1) {
          var hint = question.hint;
          document.getElementById("hint").textContent = hint;
          currentQuestionIndex++;
        } else {
          closeModal();
          showCompletionMessage();
          return;
        }
      } else {
        console.log("You need to relocate to the location."); 
      }

      closeModal();
    });

    function closeModal() {
      modal.style.display = "none";
      submitButton.removeEventListener("click", closeModal);
    }
  }

  var clickCount = score;

  function expand() {
    clickCount++;
    if (clickCount === 1) {
      var image = document.getElementById("myImage");
      image.classList.toggle("expanded-image");
      clickCount = 0;
    }
  }

  function showCompletionMessage() {
    var modal = document.createElement("div");
    modal.className = "modal";
    modal.style.display = "block";

    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    var completionMessage = document.createElement("p");
    completionMessage.textContent = "Congratulations! You have answered all the questions.";

    var closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.removeChild(modal);
    });

    modalContent.appendChild(completionMessage);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

  function getCurrentLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          callback(latitude, longitude);
        },
        function (error) {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; 
  
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c;
    return distance * 1000; 
  }
  

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function isLocationWithinRadius(userLat, userLon, targetLat, targetLon, radius) {
    var distance = calculateDistance(userLat, userLon, targetLat, targetLon);
    return distance <= radius;
  }

  function handleImageClick() {
    getCurrentLocation(function (latitude, longitude) {
      var currentQuestion = questions[currentQuestionIndex];

      var isWithinRadius = isLocationWithinRadius(
        latitude,
        longitude,
        currentQuestion.latitude,
        currentQuestion.longitude,
        radius
      );

      if (isWithinRadius) {
        showQuestionDialog(currentQuestion);
      } else {
        showLocationErrorModal();
      }
    });
  }

  function showLocationErrorModal() {
    var locationModal = document.getElementById("locationModal");
    locationModal.style.display = "block";

    var closeLocationModalButton = document.getElementById("closeLocationModalButton");
    closeLocationModalButton.addEventListener("click", function () {
      locationModal.style.display = "none";
    });
  }
  

  window.addEventListener("load", function () {
    var scoreElement = document.getElementById("score");
    var hintElement = document.getElementById("hint");

    var imageElement = document.querySelector(".center-image img");
    imageElement.addEventListener("click", handleImageClick);

    scoreElement.textContent = score;
    hintElement.textContent = "";
  });
})();