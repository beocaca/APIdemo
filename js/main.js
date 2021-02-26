import 'regenerator-runtime/runtime'

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

  start()

  setTimeout(() => {
    console.log(usersAPI)
  }, 2000)
}
