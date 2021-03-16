// Userlist data array
var userListData = [];
// DOM Ready
$(document).ready(function(){
  // populate table on page load
  populateTable();
});

// fill table with data
function populateTable() {
  var tableContent = '';
  //jQuery AJAX call for json
  $.getJSON('/users/userlist', function(data){
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