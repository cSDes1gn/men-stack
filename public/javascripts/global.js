// Userlist data array
var userListData = [];
// DOM Ready
$(document).ready(function(){
  // populate table on page load
  populateTable();
  // Username link click
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
});

// fill table with data
function populateTable() {
  var tableContent = '';
  //jQuery AJAX call for json
  $.getJSON('/users/userlist', function(data){
    // take a snapshot of the userlist data into global var for universal access
    userListData = data;
    // for each utem in the json document add a table row and cells to the content
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });
    // inject the content string into our html table
    $('#userList table tbody').html(tableContent);
  });
};

function showUserInfo(event){
  // prevent link from firing
  event.preventDefault();
  // get username from link rel attribute
  var thisUserName = $(this).attr('rel');
  // get index of object from id value
  var arrayPosition = userListData.map(function(arrayItem){ return arrayItem.username; }).indexOf(thisUserName);
  // get user object
  var thisUserObject = userListData[arrayPosition];
  // populate info box
  $('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);
};