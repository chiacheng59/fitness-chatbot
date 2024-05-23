function doPost(e) {
 
  var CHANNEL_ACCESS_TOKEN = ''; // LINE Bot API Token
  var msg = JSON.parse(e.postData.contents);

  console.log(msg);
    
  var replyToken = msg.events[0].replyToken;
  var userMessage = msg.events[0].message.text;
  
  const sheet_url = 'https://docs.google.com/spreadsheets/d/******';
  const sheet_name = 'weight';
  const SpreadSheet = SpreadsheetApp.openByUrl(sheet_url);
  const reserve_list = SpreadSheet.getSheetByName(sheet_name);

  
    if (typeof replyToken === 'undefined') {
    return;
  }
  if (!isNaN(userMessage)) {
    // 將數值存入 Google 試算表
    var now = new Date();
    reserve_list.appendRow([now, userMessage]);

    send_msg(CHANNEL_ACCESS_TOKEN, replyToken, '今天體重是：' + userMessage + '公斤');
  } else {
    send_msg(CHANNEL_ACCESS_TOKEN, replyToken, '無法辨識');
  }
}


function send_msg(token, replyToken, text) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text':  text ,
      }],
    }),
  });
  
}
