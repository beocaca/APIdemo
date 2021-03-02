import 'regenerator-runtime/runtime'
/*

var courseAPI = 'https://603713ec54350400177218c0.mockapi.io/users'
var usersAPI = []
var newId = 0;

function renderCourse(courses) {
  if (usersAPI.length > 100) {
    alert('MAX OPP 100')
    return 0
  } else {
    var listCourseBlock = document.querySelector('#list-course')
    var htmls = courses.map((course) => {
      newId = parseInt(course.id, 10) + 1
      return `
    <li>
    <p>id : ${course.id}</p>
    <h2>Name : ${course.name}</h2>
    <h3>Job : ${course.job}</h3>
    <button onclick="handleDeleteCourse(${course.id})">DELETE</button>
    <button onclick="handleEditCourse(${course.id})">EDIT</button>
    </li>
    `
    })
    listCourseBlock.innerHTML = htmls.join('')
  }
}

function handleCreateForm() {
  var createBtn = document.querySelector('#create')
  createBtn.onclick = (e) => {
    var nameInput = validateName(document.querySelector('input[name="name"]').value)
    var jobInput = document.querySelector('input[name="job"]').value
    if (nameInput === false) {
      return 0
    } else {
      var formData = {
        "id": newId,
        "name": nameInput,
        "job": jobInput,
      }
      usersAPI.push(formData)
      createCourse(formData, function (elm) {
        renderCourse(usersAPI)
      })
      clearInput()
    }
  }
}

function getCourses(callback) {
  fetch(courseAPI)
    .then((response) => {
      return response.json()
    })
    .then(callback);
}

function createCourse(data, callback) {
  var option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  fetch(courseAPI, option)
    .then((response) => {
      response.json();
    })
    .then(callback)
}

function deleteCourse(id, callback,) {
  var option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch(courseAPI + '/' + id, option)
    .then((response) => {
      response.json();
    })
    .then(callback)
}

function editCourse(id, data, callback) {
  var option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  fetch(courseAPI + '/' + id, option)
    .then((response) => {
      response.json();
    })
    .then(callback)
}

function clearInput() {
  document.querySelector('input[name="name"]').value = ''
  document.querySelector('input[name="job"]').value = ''
  document.querySelector('input[name="jobEdit"]').value = ''
  document.querySelector('input[name="nameEdit"]').value = ''
}

var validateName = (name) => {
  if (!name || !name.trim() || name.trim().length < 3) {
    alert("Invalid Name")
    return false;
  }
  return name;
}

window.handleEditCourse = function handleEditCourse(x) {
  var aUser = usersAPI.find(e => {
    return parseInt(e.id, 10) === x
  })

  var editBtn = document.querySelector(`button[onclick='handleEditCourse(${x})']`)

  document.querySelector('input[name="nameEdit"]').value = aUser.name

  document.querySelector('input[name="jobEdit"]').value = aUser.job

  var btnSave = document.querySelector('#save')

  btnSave.onclick = (e) => {
    var newName = validateName(document.querySelector('input[name="nameEdit"]').value)
    var newJob = document.querySelector('input[name="jobEdit"]').value
    if (newName === false) {
      closeModal()
    } else {
      var formData = {
        name: newName,
        job: newJob
      }
      usersAPI.forEach(e => {
        if (parseInt(e.id, 10) === x) {
          e.name = newName
          e.job = newJob
        }
      })
      editCourse(x, formData, renderCourse(usersAPI))
      clearInput()
      e.stopPropagation()
      closeModal()
    }
    console.log(newName)
  }
  showModal()
}

window.handleDeleteCourse = function handleDeleteCourse(idFilter) {
  var filtedArr = usersAPI.filter(e => {
    return parseInt(e.id, 10) !== idFilter
  })
  usersAPI = filtedArr
  deleteCourse(idFilter, () => {
    renderCourse(usersAPI)
  })
}

window.onload = () => {

  var modal = (document.querySelector('#myModal'))

  window.showModal = function showModal() {
    modal.style.display = 'block'
  }

  window.closeModal = function closeModal() {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  function start() {

    getCourses((courses) => {
      courses.forEach(e => {
        usersAPI.push(e)
      })
      renderCourse(usersAPI)
    })

    handleCreateForm()
  }

  /!*
    start()
  *!/

}
*/


var API = 'https://603713ec54350400177218c0.mockapi.io/users'
const axios = require('axios').default;
var list = []

function getUsers() {
  axios.get(API)
    .then(function (response) {
      // handle success
      list = [...response.data]
      renderUsers(list)
      console.log(list)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

function renderUsers(listUsers) {
  var listBlock = document.querySelector('#list-course')
  var htmls = listUsers.map(e => {
    return `
    <li>
  <h2>id : ${e.id} </h2>
  <h3>Name :  ${e.name} </h3>
  <h4> Job :  ${e.job} </h4>
  <button onclick="btnDelete(${e.id})"> Xoá</button>
  <button onclick="btnEdit(${e.id})">Sửa</button>
    </li>
    `
  })
  listBlock.innerHTML = htmls.join('')
}

window.btnDelete = function btnDelete(id) {
  if (window.confirm('Xoá hả ?')) {

    document.querySelector(`button[onclick = "btnDelete(${id})"]`).style.display = 'none'
    document.querySelector(`button[onclick = "btnEdit(${id})"]`).style.display = 'none'

    axios.delete(API + '/' + id)
      .then(function (response) {

        var indexId = list.findIndex(e => {
          return e.id === `${id}`
        })

        list.splice(indexId, 1)
        renderUsers(list)

        console.log(list)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
}

window.btnEdit = function btnEdit(id) {
  var modal = (document.querySelector('#myModal'))

  modal.style.display = 'block'

  var a = list.find(e => {
    return e.id === `${id}`
  })

  var nameInput = document.querySelector('input[name = "nameEdit"]')
  var jobInput = document.querySelector('input[name = "jobEdit"]')
  nameInput.value = a.name
  jobInput.value = a.job
  document.querySelector('#save').onclick = (e) => {
    if (validate(nameInput.value)) {
      axios.put(API + '/' + id, {
        name: nameInput.value,
        job: jobInput.value
      })
        .then(function (response) {
          var index = list.findIndex(e => {
            return e.id === `${id}`
          })
          list[index] = response.data
          renderUsers(list)
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(closeModal)
    }
    closeModal()
  }

  function closeModal() {
    modal.style.display = 'none'
  }

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
}

function validate(name) {
  if (!name || !name.trim() || name.trim().length < 3) {
    alert("Invalid Name")
    return false;
  }
  return name;
}

function addUser() {
  var btnCreate = document.querySelector('#create')
  btnCreate.onclick = (e => {
    var newName = document.querySelector('input[name = "name"]').value
    var newJob = document.querySelector('input[name = "job"]').value
    if (validate(newName)) {
      btnCreate.style.display = 'none'
      axios.post(API, {
        name: newName,
        job: newJob
      })
        .then(function (response) {
          var newUser = response.data
          list.push(newUser)
          renderUsers(list)
          console.log(list)
        })
        .catch(function (error) {
          console.log(error);
        }).then(() => {
        btnCreate.style.display = 'block'
      })
    }
  })
}

window.onload = () => {

  getUsers()

  addUser()

}





















