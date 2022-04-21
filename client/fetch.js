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
    return sendHttpRequest('GET', `http://localhost:8000/employees/${id}`);
    // .then(responseData => {
    //     console.log(responseData);
    // })
    // .catch(err => {
    //     console.log(err);
    // });
};

window.getAllEmployees = function() {
    return sendHttpRequest('GET', 'http://localhost:8000/employees');
};

window.insertNewEmployee = function(newData) {
    return sendHttpRequest('POST', 'http://localhost:8000/employees', newData);
};

window.updateEmployee = function(newData) {
    return sendHttpRequest('PATCH', 'http://localhost:8000/employees', newData);
};

window.deleteEmployee = function(id) {
    return sendHttpRequest('DELETE', `http://localhost:8000/employees/${id}`);
};



