import 'regenerator-runtime/runtime'

/*
import axios from "axios";

axios.get('https://5fb3f39db6601200168f817f.mockapi.io/users/')
  .then(function (response) {
    var obj = response.data.items
    users = obj
    return obj
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

var api = 'https://5fb3f39db6601200168f817f.mockapi.io/users/'
var users = [];

window.onload = () => {
  setTimeout(() => {
    users.forEach(e => {
      console.log(e)
    })
  }, 2000)
}
*/

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
  createBtn.onclick = () => {
    var nameInput = document.querySelector('input[name="name"]').value
    var jobInput = document.querySelector('input[name="job"]').value
    var formData = {
      id: newId,
      name: nameInput,
      job: jobInput,
    }
    usersAPI.push(formData)

    createCourse(formData, function (elm) {
      renderCourse(usersAPI)
    })
    clearInput()
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


window.handleEditCourse = function handleEditCourse(x) {
  var aUser = usersAPI.find(e => {
    return parseInt(e.id, 10) === x
  })

  var editBtn = document.querySelector(`button[onclick='handleEditCourse(${x})']`)

  document.querySelector('input[name="name"]').value = aUser.name

  document.querySelector('input[name="job"]').value = aUser.job

  var btnSave = document.querySelector('#save')

  btnSave.onclick = () => {
    var newName = document.querySelector('input[name="name"]').value
    var newJob = document.querySelector('input[name="job"]').value
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
  }
}

function clearInput() {
  document.querySelector('input[name="name"]').value = ''
  document.querySelector('input[name="job"]').value = ''
}


window.handleDeleteCourse = function handleDeleteCourse(idFilter) {
  var filtedArr = usersAPI.filter(e => {
    return parseInt(e.id, 10) !== idFilter
  })
  usersAPI = filtedArr
  deleteCourse(idFilter, () => {
    renderCourse(filtedArr)
  })
}

window.onload = () => {

  function start() {

    getCourses((courses) => {
      courses.forEach(e => {
        usersAPI.push(e)
      })
      renderCourse(usersAPI)
    })

    handleCreateForm()
  }

  start()
  setTimeout(() => {
    console.log(usersAPI)
  }, 2000)
}
