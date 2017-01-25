angular.module('starter.controllers', ['ionic', 'ionic.contrib.ui.tinderCards2'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, FBqueries, $firebaseArray, $rootScope, sharedUtils, $firebaseObject,fireBaseData,Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

firebase.auth().onAuthStateChanged(function(user) {
   
      if (user) {
      //console.log(user.uid); 
        //Accessing an array of objects using firebaseObject, does not give you the $id , so use firebase array to get $id
        //$scope.jobsliked = $firebaseArray(fireBaseData.ref().child("likes").child(user.uid));
      //var event= [{}];
   /*  FBqueries.join("likes/"+user.uid,"jobs","jobid").then(function (likedjobs){

        angular.forEach(likedjobs, function(job) {
            //console.log(user);
           //console.log(job);

            //joining on Company
            var t = $firebaseObject(fireBaseData.refCompany().child(job.Company));
            job.jobid = t;

              })

      
      $scope.jobsliked = likedjobs;

      });

*/    

      sharedUtils.showLoading(); //starts the loading popup
      var listofOB = [];
      var empOB;
      fireBaseData.ref().child('likes/'+user.uid).on('child_added', snap1 => {
        
        fireBaseData.ref().child('jobs').child(snap1.val().jobid).once('value', function(snap2){
          
          fireBaseData.refCompany().child(snap2.val().Company).once('value', function(snap3){
          
          //console.log(snap1.val());
         // console.log(snap2.val());
         // console.log(snap3.val());
         //console.log(snap1.val().jobid);
         empOB = snap1.val();
         //empOB['jid'] = 44;

         empOB.job = snap2.val();
         empOB.job.Company = snap3.val();
          listofOB.push(empOB);
         //  console.log(empOB);
          
        })

        })
      })

      } // end if

      //console.log(listofOB);
      sharedUtils.hideLoading();  //3
      $scope.jobsliked = listofOB;
      //$rootScope.storeOB = 43434;

      //FBqueries.save_storeOB($scope.jobsliked);
        });


  //$scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, fireBaseData, $stateParams,$rootScope,FBqueries,Chats) {
  $scope.chat = Chats.get($stateParams.
    chatId);
      /* too slow
      jobs = FBqueries.get_storeOB();
      angular.forEach(jobs, function(job){
        
        if(job.jobid == $stateParams.chatId){$scope.chat = job.job;
          console.log($scope.chat);
        } // end if
        
      });*/ //too slow

        fireBaseData.ref().child('jobs/'+$stateParams.chatId).once('value', function(snap){

            fireBaseData.refCompany().child(snap.val().Company).once('value',function(job){
              //console.log(job.val());

             $scope.chat = snap.val();
             $scope.chat.Company = job.val();
            });

        //console.log(snap.val().Company);
         });

  //console.log(FBqueries.get_storeOB());
  //console.log($rootScope.storeOB);
  })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };



      



})

.controller('signupCtrl', function($scope,$rootScope,sharedUtils,$ionicSideMenuDelegate,$state,fireBaseData,$ionicHistory) {
    $rootScope.extras = false; // For hiding the side bar and nav icon
 
    $scope.signupEmail = function (formName, cred) {
 
      if (formName.$valid) {  // Check if the form data is valid or not
 
        sharedUtils.showLoading();
 
        //Main Firebase Authentication part
        firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function (result) {


 
            //Add name and default dp to the Autherisation table
            result.updateProfile({
              displayName: cred.name,
              photoURL: "default_dp"
            }).then(function() {}, function(error) {});
 
      
      //We create a user table to store users additional information.Here, telephone
            //Add phone number to the user table
            fireBase.refUser().child(result.uid).set({
              telephone: cred.phone
            });
 
            //Registered OK
            $ionicHistory.nextViewOptions({
              historyRoot: true
            });
            $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
            $rootScope.extras = true;
            sharedUtils.hideLoading();
            $state.go('tab.dash', {}, {location: "replace"});
 
        }, function (error) {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Please note","Sign up Error");
        });
 
      }else{
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }
 
    }
 
  })



/*
    ionicSideMenuDelegate : used to access the slidable functionality of the menu drawer 
*/
.controller('loginCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate) {
    $rootScope.extras = false;  // For hiding the side bar and nav icon
 
    // When the user logs out and reaches login page,
    // we clear all the history and cache to prevent back link
    $scope.$on('$ionicView.enter', function(ev) {
      if(ev.targetScope !== $scope){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }
    });
 
 
    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
 
    //Removes back link to login page
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
        $rootScope.extras = true;
        sharedUtils.hideLoading();
        $state.go('tab.dash', {}, {location: "replace"});
 
      }
    });
 
 
    $scope.loginEmail = function(formName,cred) {
 
 
      if(formName.$valid) {  // Check if the form data is valid or not
 
          sharedUtils.showLoading(); //starts the loading popup
 
          //Email Login via Firebase
          firebase.auth().signInWithEmailAndPassword(cred.email,cred.password).then(function(result) {
 
                // You dont need to save the users session in your local session or cookies. Firebase handles it.
                
        // You only need to :
                // 1. clear the login page history from the history stack so that you cant come back
                // 2. Set rootScope.extra;
                // 3. Turn off the loading
                // 4. Got to menu page
 
      
              $ionicHistory.nextViewOptions({
                historyRoot: true   //1
              });
              $rootScope.extras = true;  //2
              sharedUtils.hideLoading();  //3
              $state.go('tab.dash', {}, {location: "replace"}); //4
 
            },
            function(error) {
              sharedUtils.hideLoading();
              sharedUtils.showAlert("Please note","Authentication Error");
            }
        );
 
      }else{
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }
 
 
 
    };
 
 
    $scope.loginFb = function(){
      //Facebook Login
    };
 
    $scope.loginGmail = function(){
      //Gmail Login
    };
 
 
})


/*
  firebaseArray: for accessing synchronized array of objects
  firebaseObject: for accessing single synchronized object 
  */
  
  .controller('settingsCtrl', function(
    $scope,$rootScope, fireBaseData,$firebaseObject, $ionicPopup,$state,$window,$firebaseArray,sharedUtils,$ionicSideMenuDelegate, FBqueries,$ionicHistory) {
    //Bugs are most prevailing here
    $rootScope.extras=true;
 
    //Shows loading bar
    sharedUtils.showLoading();
 
    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

 
        //Accessing an array of objects using firebaseObject, does not give you the $id , so use firebase array to get $id
        $scope.addresses= $firebaseArray(fireBaseData.refUser().child(user.uid).child("address"));

 
        // firebaseObject is good for accessing single objects for eg:- telephone. Don't use it for array of objects
        $scope.user_extras= $firebaseObject(fireBaseData.refUser().child(user.uid));
 
        $scope.user_info=user; //Saves data to user_info
        //NOTE: $scope.user_info is not writable ie you can't use it inside ng-model of <input>
 
        //You have to create a local variable for storing emails
        $scope.data_editable={};
        $scope.data_editable.email=$scope.user_info.email;  // For editing store it in local variable
        $scope.data_editable.password="";
 
        $scope.$apply();
 
        sharedUtils.hideLoading();
 
      }
 
    });
  
  //Function 1
    $scope.addManipulation = function(edit_val) {  // Takes care of address add and edit ie Address Manipulator
 
  
      
      if(edit_val!=null) {
        $scope.data = edit_val; // For editing address


        var title="Edit Address";
        var sub_title="Edit your address";
      }
      else {
        $scope.data = {};    // For adding new address
        var title="Add Address";
        var sub_title="Add your new address";
      }
      // An elaborate, custom popup
      var addressPopup = $ionicPopup.show({
        template: '<input type="text"   placeholder="Nick Name"  ng-model="data.nickname"> <br/> ' +
                  '<input type="text"   placeholder="Address" ng-model="data.address"> <br/> ' +
                  '<input type="number" placeholder="Pincode" ng-model="data.pin"> <br/> ' +
                  '<input type="number" placeholder="Phone" ng-model="data.phone">',
        title: title,
        subTitle: sub_title,
        scope: $scope,
        buttons: [
          { text: 'Close' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.nickname || !$scope.data.address || !$scope.data.pin || !$scope.data.phone ) {
                e.preventDefault(); //don't allow the user to submit unless he enters full details
              } else {
                return $scope.data;
              }
            }
          }
        ]
      });
 
      addressPopup.then(function(res) {





        if(edit_val!=null) {
          //Update  address
          fireBaseData.refUser().child($scope.user_info.uid).child("address").child(edit_val.$id).update({    // update
            nickname: res.nickname,
            address: res.address,
            pin: res.pin,
            phone: res.phone
          });
        }else{
          //Add new address
          fireBaseData.refUser().child($scope.user_info.uid).child("address").push({    // push
            nickname: res.nickname,
            address: res.address,
            pin: res.pin,
            phone: res.phone
          });
        }
 
      });
 
    };
 
    // A confirm dialog for deleting address
    $scope.deleteAddress = function(del_id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Address',
        template: 'Are you sure you want to delete this address',
        buttons: [
          { text: 'No' , type: 'button-stable' },
          { text: 'Yes', type: 'button-assertive' , onTap: function(){return del_id;} }
        ]
      });
 
      confirmPopup.then(function(res) {
        if(res) {
          fireBaseData.refUser().child($scope.user_info.uid).child("address").child(res).remove();
        }
      });
    };
 
  //Function 2
    $scope.save= function (extras,editable) {


      //1. Edit Telephone doesnt show popup 2. Using extras and editable  // Bugs
      if(extras.telephone!="" && extras.telephone!=null ){

        
        //Update  Telephone
        fireBaseData.refUser().child($scope.user_info.uid).update({    // set
          telephone: extras.telephone
        });
      }

 
      //Edit Password
      if(editable.password!="" && editable.password!=null  ){
        //Update Password in UserAuthentication Table
        firebase.auth().currentUser.updatePassword(editable.password).then(function(ok) {}, function(error) {});
        sharedUtils.showAlert("Account","Password Updated");
      }
 
      //Edit Email
      if(editable.email!="" && editable.email!=null  && editable.email!=$scope.user_info.email){
 
        //Update Email/Username in UserAuthentication Table
        firebase.auth().currentUser.updateEmail(editable.email).then(function(ok) {
          $window.location.reload(true);
          //sharedUtils.showAlert("Account","Email Updated");
        }, function(error) {
          sharedUtils.showAlert("ERROR",error);
        });
      }
 
    };
 
    $scope.cancel=function(){
      // Simple Reload
      $window.location.reload(true);
      console.log("CANCEL");
    }


    $scope.logout=function(){

      sharedUtils.showLoading();

      // Main Firebase logout
      firebase.auth().signOut().then(function() {


        $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });

console.log("lo");
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('tabsController.login', {}, {location: "replace"});

      }, function(error) {
         sharedUtils.showAlert("Error","Logout Failed")
      });

    }


 $scope.locationlist = FBqueries.getlists("locations");
  $scope.rolelist = FBqueries.getlists("roles");
   $scope.typelist = FBqueries.getlists("types");

 
      /* work on this later
      $scope.locationlistpick = FBqueries.getlocationlistpick(); 
      $scope.rolelistpick = FBqueries.getrolelistpick();
      $scope.typelistpick = FBqueries.gettypelistpick();
console.log($scope.locationlistpick );
*/

     //console.log($scope.locationlist);

      //console.log(FBqueries.locationlist);

      $scope.skillsList1 = [
            {id: 1, name : "2Java"},
            {id: 2, name : "C"},
            {id: 3, name : "C++"},
            {id: 4, name : "Core Java"},
            {id: 5, name : "JavaScript"},
            {id: 6, name : "PHP"},
            {id: 7, name : "HTML"},
            {id: 8, name : "CSS"},
            {id: 9, name : "Angular Js"},
            {id: 10, name : "Bootstrap"}
        ];

        $scope.skillsList = [
            "Java",
            "C",
            "C++",
            "Core Java",
            "Javascript",
            "PHP",
            "MySql",
            "Hibernate",
            "Spring",
            "AngularJs",
            "BackboneJs",
            "Sencha Touch",
            "Austin",
            "ExtJs"
        ];

        $scope.selectItemCallback = function(item){
            $scope.selectedItem = item;
        };

        $scope.removeItemCallback = function(item){
            $scope.removedItem = item;
        };

        $scope.onSubmit = function () {
            console.log("submit");
            console.log($scope.locationlistpick+$scope.rolelistpick+$scope.typelistpick);
            if($scope.multipleSelectForm.$invalid){
                if($scope.multipleSelectForm.$error.required != null){
                    $scope.multipleSelectForm.$error.required.forEach(function(element){
                        element.$setDirty();
                        
                    });
                }

                return null;
            }
            alert("valid field");
        };
        
 
})

.config(function($stateProvider, $urlRouterProvider) {

})

/*
.factory('Jobs', function($firebaseArray) {
  var messagesRef = new Firebase("https://twinkle-49ce7.firebaseio.com/");
  return $firebaseArray(messagesRef);
})*/


.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})




.controller('TPCtrl', function($scope, TDCardDelegate, $timeout, $firebaseArray,fireBaseData, $ionicModal,$firebaseObject) {

  var cardTypes = [
    {id:1, Title:"Revenue Analyst", Company:"http://www.logospike.com/wp-content/uploads/2014/11/Blackberry_logo-2.jpg",Location:"Waterloo. Ont", Team:"Accounting", Salary:"competitive", image: 'http://www.logospike.com/wp-content/uploads/2014/11/Blackberry_logo-2.jpg' },
    {id:2, Title:"Revenue Analyst", Company:"http://www.logospike.com/wp-content/uploads/2014/11/Blackberry_logo-2.jpg",Location:"Waterloo. Ont", Team:"Accounting", Salary:"competitive", image: 'https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png' },
    {id:3, image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' }
  ];

//$scope.cards = [{Title:"asdas"}, {Title:"44"},{Title:"55555"}];


var jobs = $firebaseArray(fireBaseData.ref().child("jobs"));
jobs;
     
     jobs.$loaded().then(function(cards) {
      
       angular.forEach(cards, function(job) {
            //console.log(user);
           // console.log(job);

            //joining on Company
            var t = $firebaseObject(fireBaseData.refCompany().child(job.Company));
            job.Company = t;

              })
       $scope.cards = cards;

});

console.log($scope.cards);
   



/*
$scope.getcompany = function(table,key){ 
  
 FBqueries.test(table,key).then(function(snap){
       $scope.result = snap;
      
   });
 //console.log($scope.result);
 return $scope.result;

};
*/


//$scope.getcompany("company", "-Kb2Og2A18Q43cqjLqRy")

 /* var user_id = 101;

  $scope.likes = {userid: user_id, jobid : []};
  $scope.dislikes = {userid: user_id, jobid : []};

*/

 
 





  $scope.cardDestroyed = function(index) {
    //$scope.cards.active.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[0];
    $scope.cards.active.push(angular.extend({}, newCard));
  }

  $scope.refreshCards = function() {
    // Set $scope.cards to null so that directive reloads
    $scope.cards.active = null;
    $timeout(function() {
      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
    });
  }

  $scope.$on('removeCard', function(event, element, card) {
    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
    $scope.cards.discards.push(discarded);
  });

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    var card = $scope.cards[index];
    //$scope.cards.disliked.push(card);
    //$scope.dislikes.jobid.push(card.id);
    $scope.storeswipe("dislikes", card);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    var card = $scope.cards[index];
    //$scope.cards.liked.push(card);
    //$scope.likes.jobid.push(card.id);
    $scope.storeswipe("likes", card);
  };

$scope.openModal = function(cardID) {
    $ionicModal.fromTemplateUrl('templates/detail.html', {
        scope: $scope
        
    })
        .then(function(modal) {
            $scope.modal = modal;
            if ($scope.modal!=undefined)
            $scope.modal.show();
        });
   
  };


$scope.closeModal = function() {
        $scope.modal.hide();
    };

//Firebase stuff
//$scope.jobs =  Jobs;
//console.log($scope.jobs);

$scope.storeswipe = function(like_dislike,job){
       
 firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
      

        //Add new address
/*        var push = true;
          fireBaseData.ref().child(like_dislike).child(user.uid).on('child_added', function(data){    // push
            
            angular.forEach(data.val(),function(item){
              if(item == job.id)
              {push = false;} //  if           });

           //console.log(data.val());
            //jobid : job.$id
              });
            }); 
*/


          if(true){
            fireBaseData.ref().child(like_dislike).child(user.uid).push({    // push
           
                jobid : job.$id
              });

            }// if
              
          }// if
        });
  }
})






.controller('addjobsCtrl', function(sharedUtils,$scope,fireBaseData) {



$scope.addjob = function (formName, cred) {
 
  
      if (formName.$valid) {  // Check if the form data is valid or not
 
       sharedUtils.showLoading();

      //We create a user table to store users additional information.Here, telephone
            //Add phone number to the user table
            fireBaseData.ref().child("jobs").push({
              Title: cred.title,
              Location: cred.location,
              Type: cred.type,
              Salary: cred.salary,
              Company: cred.company,
              Role: cred.role,
              Description: cred.description,
              Responsibilities: cred.responsibilities,
              Qualifications: cred.qualifications,
              Perks: cred.perks
            });
 
           
            sharedUtils.hideLoading();
         
          }
 
      else{
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }
    }
 

 $scope.addcompany = function (formName, cred) {
 
  
      if (formName.$valid) {  // Check if the form data is valid or not
 
       sharedUtils.showLoading();

      //We create a user table to store users additional information.Here, telephone
            //Add phone number to the user table
            fireBaseData.ref().child("company").push({
              Name: cred.name,
              Logo: cred.logo
              
            });
 
           
            sharedUtils.hideLoading();
         
          }
 
      else{
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }
    }
 
    

});
