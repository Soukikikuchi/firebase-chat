




(function() {
  'use strict';
  var image_url=""

  // ** TODO - firestoreに接続してデータを取得する処理
  console.log("初期処理");

  db.collection('chat-app')
    .orderBy('date', 'desc')
    .limit(100)
    .onSnapshot(ss => {
      // console.log(ss);
      $('#comment').empty();
      ss.forEach(doc => {
        const data = doc.data();

        if(data.imageUrl){
          $('#comment').append(
            `
            <div class="ui floating message">
              <div class="header"style="margin-bottom:0.4rem;">`+(data.name)+`
              </div>
              <div style="word-wrap: break-word;">
              `+(data.tweet)+`</div >
              `+(data.date)+`
              <img class="ui fluid image" src="`+data.imageUrl+`">
            </div>
            `)
        }else {
          $('#comment').append(
            `
            <div class="ui floating message">
              <div class="header"style="margin-bottom:0.4rem;">`+(data.name)+`
              </div>
              <div style="word-wrap: break-word;">
              `+(data.tweet)+`</div >
              `+(data.date)+`
            </div>
            `)
        }

 
          //<img class="ui fluid image" src="https://semantic-ui.com/images/wireframe/image.png">
      });
    });

  // ** 送信ボタンを押す処理
  $('#submit').on('click', function() {
    var name = $('#name').val();
    var tweet = $('#tweet').val();

    var m = moment(); //現在の時刻が入る
    var output = m.format('YYYY年MM月DD日 HH:mm:ss');
    console.log(output); // => 2014年10月24日 11:44:00 Friday
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
    if(tweet.length>200){
      alert(`200文字以内です`)
      return;
    }

    var array = {}

    if(image_url !=""){
      var ref = firebase
        .storage()
        .ref()
        .child('image/' + image_url.name);
      ref.put(image_url).then(function(snapshot) {
        firebase
          .storage()
          .ref('image/' + image_url.name)
          .getDownloadURL()
          .then(url => {
          
            console.log(url);
            array = {
              name:name,
              tweet:tweet,   
              date:output,
              imageUrl:url
            }
            setTeet(array);
          });
      });
  
    }else {
      array = {
        name:name,
        tweet:tweet,   
        date:output,
      }
      setTeet(array);
    }
   
    // ** TODO - 変数nameと変数hogeをfirestoreにデータを登録する処理
  });

  function setTeet(array){
    db.collection("chat-app").add(array).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
      
    });
  }

  const checkTweet = function(tweet) {
    // ** TODO - 一言のチェックをする関数
      
  };

  $('#tweet').on('change keyup', function() {
    // ** TODO - フォームに何か入力があったときに、残りの文字数を表示する処理
 
    console.log('一言に何か呟かれています');
    var tweet = $('#tweet').val();
    $("#counter").html(tweet.length+"文字")
  });

  $('#hidden-new-file').on('change', function() {
    var files = document.getElementById('hidden-new-file').files;
    var image = files[0];

    if (image == '' || image == null) {
      return;
    }

    var type = image.name.split('.');
    type = type[type.length - 1].toLowerCase();

    if (
      type == 'jpg' ||
      type == 'png' ||
      type == 'gif' ||
      type == 'jpeg' ||
      type == 'JPEG' ||
      type == 'webp'
    ) {
      // alert(type);
    } else {
      alert('画像は『jpg』『jpeg』『png』『gif』の拡張子から選んで下さい。');
      return;
    }

    image_url = image;

    if (!isImage(image_url.name)) {
      image_url = '';
      alert('画像が存在していません。もう一度やり直して下さい。');
      return;
    }

    $('#set_icon_button').removeClass('disabled');
    $('#image_url').html(image_url.name);
  });

  function isImage(picture_url) {
    var img = new Image();
    img.src = picture_url;
    img.onerror = function() {
      picture_url = 0;
      return false;
    };
    if (picture_url != null && picture_url != '' && picture_url != 0) {
      return true;
    }
    return false;
  }
})();
