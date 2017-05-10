angular.module('starter.services', [])


.factory('fireBaseData', function($firebase) {
  var ref = new Firebase("https://tinder-tips.firebaseio.com"),
    refCart = new Firebase("https://tinder-tips.firebaseio.com/cart"),
    refUser = new Firebase("https://tinder-tips.firebaseio.com/users"),
    refCategory = new Firebase("https://tinder-tips.firebaseio.com/category"),
    refOrder = new Firebase("https://tinder-tips.firebaseio.com/orders"),
    refFeatured = new Firebase("https://tinder-tips.firebaseio.com/featured"),
    refMenu = new Firebase("https://tinder-tips.firebaseio.com/menu"),
    refJobs = new Firebase("https://tinder-tips.firebaseio.com/jobs"),
    refCompany = new Firebase("https://tinder-tips.firebaseio.com/company");
  return {
    ref: function() {
      return ref;
    },
    refCart: function() {
      return refCart;
    },
    refUser: function() {
      return refUser;
    },
    refCategory: function() {
      return refCategory;
    },
    refOrder: function() {
      return refOrder;
    },
    refFeatured: function() {
      return refFeatured;
    },
    refMenu: function() {
      return refMenu;
    },
    refJobs: function() {
      return refJobs;
    },
    refCompany: function() {
      return refCompany;
    }
  }
})


.factory('sharedUtils',['$ionicLoading','$ionicPopup', function($ionicLoading,$ionicPopup){


    var functionObj={};

    functionObj.showLoading=function(){
      $ionicLoading.show({
        content: '<i class=" ion-loading-c"></i> ', // The text to display in the loading indicator
        animation: 'fade-in', // The animation to use
        showBackdrop: true, // Will a dark overlay or backdrop cover the entire view
        maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
        showDelay: 0 // The delay in showing the indicator
      });
    };
    functionObj.hideLoading=function(){
      $ionicLoading.hide();
    };


    functionObj.showAlert = function(title,message) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    };

    return functionObj;

}])


.factory('FBqueries', function($q,fireBaseData, $firebaseArray, $firebaseObject) {


var  locationlistpick;
        var rolelistpick ;
        var typelistpick;

//console.log($firebaseArray(fireBaseData.ref().child('location')))

    return {

      getlocationlistpick: function(){
        return locationlistpick;
      },
      getrolelistpick: function(){
        return rolelistpick;
      },
      gettypelistpick: function(){
        return typelistpick;
      },

      setlocationlistpick: function(newlist){
        locationlistpick = newlist;
      },
      setrolelistpick: function(newlist){
        rolelistpick = newlist;
      },
      settypelistpick: function(newlist){
        typelistpick = newlist;
      },



      initialize: function(){

        locationlistpick = this.getlists("locations");
        rolelistpick = this.getlists("roles");
        typelistpick = this.getlists("types");

      },

      getlists: function(keya){
        var arr = new Array();
        fireBaseData.ref().child(keya).once('value', function(snap) {
         // console.log(snap.val());

          angular.forEach( snap.val(), 
            function(item){
            arr.push(item.Name);})
        });
       //console.log(arr);
       //alert(arr);
        return arr;
      },

     
     test: function(a,b) {

      
       var defer = $q.defer();
         fireBaseData.ref().child(a).child(b).once("value", function(snapshot) {
          // Should alert "Name of the parent: foo".
          //console.log(snapshot.val());
          defer.resolve(snapshot.val());
            } );

         return defer.promise;
        
      
      }, // test function

      

      join: function(tb1,tb2,key){

       var defer = $q.defer();
        var items = $firebaseArray(fireBaseData.ref().child(tb1));
     
     items.$loaded().then(function(item) {
      
         angular.forEach(item, function(child) {
              //console.log(user);
             // console.log(job);

              var t = $firebaseObject(fireBaseData.ref().child(tb2).child(child[key]));
                child[key] = t;
                //console.log(child[key]);

                
          })
       defer.resolve(items);
        });
        

      //return items;
      return defer.promise;


      },//end join

          

    }
})




.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
