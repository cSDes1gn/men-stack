// Userlist data array
var userListData = [];
// DOM Ready
$(document).ready(function(){
  // populate table on page load
  populateTable();
  // Username link click
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
  // Add User button click
  $('#btnSubmit').on('click', addUser);
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
  // clear previous entries
  $('#userInfo p span').each(function(index, val) {
    ($(this).val() == '')
  });
  // prevent link from firing
  event.preventDefault();
  // get username from link rel attribute
  var thisUserName = $(this).attr('rel');
  // get index of object from id value
  var arrayPosition = userListData.map(function(arrayItem){ return arrayItem.username; }).indexOf(thisUserName);
  // get user object
  var thisUserObject = userListData[arrayPosition];
  // populate info box
  $('#userInfoUserName').text(thisUserObject.username);
  $('#userInfoFullName').text(thisUserObject.fullname);
  $('#userInfoEmail').text(thisUserObject.email);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoLocation').text(thisUserObject.location);
  $('#userInfoGender').text(thisUserObject.gender);
};

function addUser(event){
  event.preventDefault();
  // form validation
  var error_flag = false;
  // phase 1: ensure all adduser text inputs are all not empty
  $('#addUser input').each(function(index, val) {
    if ($(this).val() === '') {
      error_flag = true; // cannot return inside lambda
    }
  });
  if (error_flag == true) {
    alert("Please fill in all input fields");
    return false;
  }
  // phase 2: compile data into one object and attempt post request
  var newUser = {
    'username': $('#addUser fieldset input#inputUserName').val(),
    'email': $('#addUser fieldset input#inputUserEmail').val(),
    'fullname': $('#addUser fieldset input#inputUserFullName').val(),
    'age': $('#addUser fieldset input#inputUserAge').val(),
    'location': $('#addUser fieldset input#inputUserLocation').val(),
    'gender': $('#addUser fieldset input#inputUserGender').val()
  };
  console.log("newUser: " + newUser);
  // use ajax to post the object to our adduser route
  $.ajax({
    type: 'POST',
    data: newUser,
    url: '/users/adduser',
    dataType: 'JSON'
  }).done(function(response){
    // check for success ( indicated by blamk response )
    if (response.msg === '') {
      // clear the form fields
      $('#addUser fieldset input').val('');
      populateTable();
    } else {
      // alert if post not successful
      alert("Error: " + response.msg);
    }
  });
};