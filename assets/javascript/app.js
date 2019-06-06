$(document).ready(function(){
   
    var config = {
        apiKey: "AIzaSyBXHhqgb-e5jirVkCNUWT_-KRv9ORAfeNg",
        authDomain: "projectportfolio-716ce.firebaseapp.com",
        databaseURL: "https://projectportfolio-716ce.firebaseio.com",
        projectId: "projectportfolio-716ce",
        storageBucket: "projectportfolio-716ce.appspot.com",
        messagingSenderId: "24314421763",
        appId: "1:24314421763:web:7ea835ad30cdc86c"
      };
      
      firebase.initializeApp(config);
      
      var database = firebase.database();

    $("#divDropdown").hide();
    loadProjects();
    

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Menu button on click;
    $("#btnMenu").on("click", function(){
        $("#divDropdown").toggle ();
    });

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Down arrow click

    $("#btnArrow").on("click",function(e) {
        debugger;
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({scrollTop: $(this).offset().top},500);
    });

    // Download button pressed to download the resume
    $('#btnDownload').click(function(e) {
        
        e.preventDefault();  //stop the browser from following
        window.location.href = 'assets/uploads/ResumeIndima.pdf';
    });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    function loadProjects (){
        
        // this function will dynamically build a card for each record in the database 
        // this card includes the image, and the link to the page 
       

        database.ref("projects/").on("child_added",function(snapshot){
            console.log("test");
            console.log(snapshot.val());
            var data= snapshot.val();
            // console.log("test1"+data)

                var cardImage = $("<div>");
                cardImage.addClass("card-image");
        
                var proImage = $("<img>");
                proImage.attr("src",data.imgLink);
                proImage.attr("alt",data.projectName);

                var cardAction = $("<div>");
                cardAction.addClass("card-action");
        
                var proLink = $("<a>");
                proLink.addClass("projectLinks center-align black-text");
                proLink.attr("href" ,data.projectLink);
                proLink.text(data.projectName);

                cardImage.append(proImage);
                cardAction.append(proLink);

                var divCard = $("<div>");
                divCard.addClass("card");
                divCard.append(cardImage);
                divCard.append(cardAction);

                var divCardCol = $("<div>");
                divCardCol.addClass("col s12 m10 l6 cardx");

                // divCardCol.attr("id");
                divCardCol.append(divCard);

                var divRow = $("<div>");                
                divRow.addClass("row cardRow");
                divRow.append(divCardCol);
                // divRow.append(divCard);

                var divPortfolio = $("#divPortfolio");
                divPortfolio.append(divRow);

            // }
        },function(errorobj){
             // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
        })
    }
      
})