angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
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
    $scope,$rootScope, fireBaseData,$firebaseObject, $ionicPopup,$state,$window,$firebaseArray,sharedUtils,$ionicSideMenuDelegate, $ionicHistory) {
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

        console.log(9878);
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
 
});
