


(function() {
  'use strict';

  // ** TODO - firestoreに接続してデータを取得する処理
  console.log("初期処理");
 
  db.collection("chat-app")
  .orderBy("date", "desc")
  
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          
          
          $('#comment').append(
            `
            <div class="ui floating message">
              <div class="header"style="margin-bottom:0.4rem;">`+(doc.data().name)+`
              </div>
              <div style="word-wrap: break-word;">
              `+(doc.data().tweet)+`</div >
              `+(doc.data().date)+`
            </div>
            `)
         

      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });



  // ** 送信ボタンを押す処理
  $('#submit').on('click', function() {
    var name = $('#name').val();
    var tweet = $('#tweet').val();
   
    console.log(name);
    console.log(tweet);
    if(!name){
      alert(`名前を入れてください`)
      return; 
    }
    if(!tweet){
      alert(`何か一言書いてください`)
      return;
    }


    $('#comment').append(
      `
      <div class="ui floating message">
        <div class="header"style="margin-bottom:0.4rem;">`+(name)+`
        </div>
        <div style="word-wrap: break-word;">
        `+(tweet)+`</div >
      </div>
      `)


    var m = moment(); //現在の時刻が入る
    var output = m.format('YYYY年MM月DD日 HH:mm:ss');

    console.log(output); // => 2014年10月24日 11:44:00 Friday



      var usersCollectionRef = db.collection('users');
      db.collection("chat-app").add({
        name:(name),
        tweet:(tweet),   
        date:(output),
        
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
       
    });
    
      
    // ** TODO - 変数nameと変数hogeをfirestoreにデータを登録する処理
  });

  const checkTweet = function(tweet) {
    // ** TODO - 一言のチェックをする関数
  };

  $('#tweet').on('change keyup', function() {
    // ** TODO - フォームに何か入力があったときに、残りの文字数を表示する処理
 
  
  
  
    console.log('一言に何か呟かれています');
    function greet() {
      console.count( user);
      return "hi " +  user;
    }
    
    var  user = "bob";
    greet();
    user = "alice";
    greet();
    greet();
    console.count("alice");
    
      
    		
    
  });
})();
