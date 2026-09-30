/**
 * RSVP -> Google Sheets (кесте: Той RSVP)
 * Кесте ID енгізілген — код кез келген Apps Script проектінде жұмыс істейді.
 */
var SHEET_ID = '1DomXbMRNCV1ZrUNmeu1NgrEkmDMECFsX1zyKHqQjin8';

function doPost(e) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName('Ответы');
  if (!sheet) {
    sheet = ss.insertSheet('Ответы');
    sheet.appendRow(['Уақыты', 'Аты-жөні', 'Қатысуы', 'Жұбайлар']);
    sheet.setFrozenRows(1);
  }
  var name   = e.parameter.name   || '';
  var attend = e.parameter.attend || '';
  var couple = e.parameter.couple || '';
  // оқылатын уақыт: күн.ай.жыл сағат:минут (Алматы уақыты)
  var timeStr = Utilities.formatDate(new Date(), 'Asia/Almaty', 'dd.MM.yyyy HH:mm:ss');
  sheet.appendRow([timeStr, name, attend, couple]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput('RSVP сервері жұмыс істеп тұр ✅')
    .setMimeType(ContentService.MimeType.TEXT);
}
