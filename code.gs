function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('HotDocs')
      .addItem('Get Hotdocs Computation', 'showSidebar')
      .addToUi(); 
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('StartPage')
      .setTitle('Hotdocs List Computation Generator')
      .setWidth(300);
  SpreadsheetApp.getUi() 
      .showSidebar(html);
}

function processForm(formObject) {
  var startVal = formObject.startVal;
  if (startVal) {
    var startIndex = parseInt(startVal);
  } else {
    var startIndex = 1;
  }
  var sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getSheetName() == "Attorneys") {
    return getHotdocsAttorneysComputation(startIndex);
  } else if (sheet.getSheetName() == "Courts") {
    return getHotdocsCourtsComputation(startIndex);
  } else {
    return("Please run this on a sheet named 'Courts' or 'Attorneys'");
  }
}

function getHotdocsCourtsComputation(startIndex) {
  var text = "";
  var cr = "<br/>";
  var i = 1;
  var hcText = "CLEAR Housing court MC" + cr;

  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var startRow = 1; // set to 1 to skip header row, 2 to skip an example data row as well.

  // column numbers/values as below. Column 0 is the timestamp column from Google Forms
  //1 Title 2 Department 3 Division	4 County 5 Street Address 6 City State Zip
  
  for (var j = startRow; j < data.length; j++) { 
    i = j - startRow + startIndex;
    text += 'ADD "' + data[j][1] + '" TO Court MC' + cr;
    text += 'SET DB Court department MC[' + i +'] TO "'  + data[j][2] + '"' + cr;
    text += 'SET DB Court division TE[' + i +'] TO "'  + data[j][3] + '"' + cr;
    text += 'SET DB Court county MC[' + i +'] TO "'  + data[j][4] + '"' + cr;
    text += 'SET DB Court street address[' + i +'] TO "'  + data[j][5] + '"' + cr;
    text += 'SET DB Court city state zip TE[' + i +'] TO "'  + data[j][6] + '"' + cr;
    if (data[j][2] == "Housing Court") {
      hcText += 'ADD "' + data[j][1] + '" TO Housing court MC' + cr;
    }
  }
  return text + hcText;
}

function getHotdocsAttorneysComputation(startIndex) {
  var text = "";
  var cr = "<br/>";
  var i = 1;

  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var startRow = 1; // set to 1 to skip header row, 2 to skip an example data row as well.
  
  for (var j = startRow; j < data.length; j++) { 
    i = j - startRow + startIndex;
    text += 'ADD "' + data[j][1] + '" TO Tenants attorney MC' + cr;
    text += 'SET DB Attorney name TE[' + i +'] TO "'  + data[j][1] + '"' + cr;
    text += 'SET DB Attorney office TE[' + i +'] TO "'  + data[j][2] + '"' + cr;
    text += 'SET DB Attorney E-Mail Add[' + i +'] TO "'  + data[j][3] + '"' + cr;
    text += 'SET DB Attorney address TE[' + i +'] TO "'  + data[j][4] + '"' + cr;
    text += 'SET DB Attorney city state zip TE[' + i +'] TO "'  + data[j][5] + '"' + cr;
    text += 'SET DB Attorney bbo number TE[' + i +'] TO "'  + data[j][6] + '"' + cr;
    text += 'SET DB Attorney fax TE[' + i +'] TO "'  + data[j][7] + '"' + cr;
    text += 'SET DB Attorney telephone TE[' + i +'] TO "'  + data[j][8] + '"' + cr;
  }
  return text;
}
