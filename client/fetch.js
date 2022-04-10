const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? { 'Content-Type': 'application/json'} : {}
    }).then(response => {
        if(response.status >= 400) { // !response.ok
            return response.json().then(errResData => {
                const error = new Error('Something went wrong!');
                error.data = errResData;
                throw error;
            })
        }
        return response.json();
    });
};

window.getEmployeeById = function(id) {
// const window.getEmployeeById = (id) => {
    sendHttpRequest('GET', `http://localhost:8000/employees/${id}`)
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.log(err);
    });
};

// const getAllEmployees = () => {
window.getAllEmployees = function(id) {
    sendHttpRequest('GET', 'http://localhost:8000/employees')
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.log(err);
    });
};

// const insertNewEmployee = (newData) => {
window.insertNewEmployee = function(newData) {
    sendHttpRequest('POST', 'http://localhost:8000/employees', newData)
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.log(err);
    });
};

// const updateEmployee = (newData) => {
window.updateEmployee = function(newData) {
    sendHttpRequest('PATCH', 'http://localhost:8000/employees', newData)
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.log(err);
    });
};

// const deleteEmployee = (id, newData) => {
window.deleteEmployee = function(id, newData) {
    sendHttpRequest('DELETE', `http://localhost:8000/employees/${id}`, newData)
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.log(err);
    });
};



