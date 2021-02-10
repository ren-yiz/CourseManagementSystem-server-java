var $usernameFld
var $passwordFld
var $firstNameFld
var $lastNameFld
var $roleFld
var $wbdvCreate
var theTableBody
var $updateBtn
var userService = new AdminUserServiceClient()

var users = []

function createUser() {
  var newUser = {
    username: $usernameFld.val(),
    password: $passwordFld.val(),
    firstName: $firstNameFld.val(),
    lastName: $lastNameFld.val(),
    role: $roleFld.val()
  }
  userService.createUser(newUser)
  .then(function (actualUser) {
    users.push(actualUser)
    renderUsers(users)
  })
}

function deleteUser(event) {
  var deleteBtn = $(event.target)
  var theIndex = deleteBtn.attr("id")
  var theId = users[theIndex]._id
  userService.deleteUser(theId)
  .then(function(status) {
    users.splice(theIndex, 1)
    renderUsers(users)
  })
}

var editedUser = null
function editUser(event) {
  var editBtn = $(event.target)
  var theId = editBtn.attr("id")
  editedUser = users.find(user => user._id === theId)
  $usernameFld.val(editedUser.username)
  $passwordFld.val(editedUser.password)
  $firstNameFld.val(editedUser.firstName)
  $lastNameFld.val(editedUser.lastName)
  $roleFld.val(editedUser.role)
}

function renderUsers(users) {
  theTableBody.empty()
  for (var i = 0; i < users.length; i++) {
    var user = users[i]
    theTableBody.append(`<tr class="wbdv-template wbdv-user wbdv-hidden">
          <td class="wbdv-username">${user.username}</td>
          <td>&nbsp;</td>
          <td class="wbdv-first-name">${user.firstName}</td>
          <td class="wbdv-last-name">${user.lastName}</td>
          <td class="wbdv-role">${user.role}</td>
          <td class="wbdv-actions">
          <span class="pull-right">
            <i class="fa-2x fa fa-times wbdv-remove" id="${i}"></i>
            <i class="fa-2x fa fa-pencil wbdv-edit" id="${user._id}"></i>
          </span>
          </td>
        </tr>`)
  }
  $usernameFld.val("")
  $passwordFld.val("")
  $firstNameFld.val("")
  $lastNameFld.val("")
  $roleFld.val("")
  $(".wbdv-remove").click(deleteUser)
  $(".wbdv-edit").click(editUser)
}

function updateUser() {
  editedUser.username = $usernameFld.val()
  editedUser.password = $passwordFld.val()
  editedUser.firstName = $firstNameFld.val()
  editedUser.lastName = $lastNameFld.val()
  editedUser.role = $roleFld.val()
  userService.updateUser(editedUser._id, editedUser)
  .then(function (status) {
    var index = users.findIndex(user => user._id === editedUser._id)
    users[index] = editedUser
    renderUsers(users)
  })
}

function init() {
  $usernameFld = $("#usernameFld")
  $passwordFld = $("#passwordFld")
  $firstNameFld =$("#firstNameFld")
  $lastNameFld = $("#lastNameFld")
  $roleFld = $("#roleFld")
  $wbdvCreate = $(".wbdv-create")
  theTableBody = jQuery("tbody")
  $updateBtn = $(".wbdv-update")

  $updateBtn.click(updateUser)
  $wbdvCreate.click(createUser)

  userService.findAllUsers().then(function (actualUsersFromServer) {
    users = actualUsersFromServer
    renderUsers(users)
  })
}

jQuery(init)


