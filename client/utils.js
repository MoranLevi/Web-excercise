window.clearFields = function() {
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('id').value = "";
    document.getElementById('id').removeAttribute("disabled");
    document.getElementById('age').value = "";
}

window.addRow = function() {
    // get input value
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let id = document.getElementById('id').value;
    let age = document.getElementById('age').value;

    newEmployee = {"first_name": fname, "last_name": lname, "id": id, "age": age};
    window.insertNewEmployee(newEmployee)
    .then(responseData => {
        // get the html table
        // 0 = the first table
        let table = document.getElementsByTagName('table')[0];
        
        // get the tbody of the table
        let tbody = table.getElementsByTagName('tbody')[0];

        // add new empty row to tbody of the table in the end
        let newRow = tbody.insertRow(-1);

        // add cells to the row
        let cel1 = newRow.insertCell(0);
        let cel2 = newRow.insertCell(1);
        let cel3 = newRow.insertCell(2);
        let cel4 = newRow.insertCell(3);
        let cel5 = newRow.insertCell(4);

        // add values to the cells
        cel1.innerHTML = fname;
        cel2.innerHTML = lname;
        cel3.innerHTML = id;
        cel4.innerHTML = age;

        // add remove button to the last cell
        let newElem = document.createElement( "button" );
        newElem.innerHTML = "remove";
        newElem.setAttribute("id", 'removeButton');
        newElem.setAttribute("onclick", 'window.deleteRow()');
        newElem.setAttribute("disabled", 'true');
    
        cel5.appendChild(newElem);

        // clean the fields
        clearFields();

        // add click on the new row
        initClickOnRow();
    })
    .catch(err => {
         console.log(err);
         alert("Error to insert employee! Try again...");
    });

}

let table = document.getElementById("table");
let rIndex = "undefined";
let deleteRow = 0; // symbolized that delete row. Do this for the first row after delete
let clickRemove = 0; // symbolized that click on remove button. Do this for the select row to delete.

// edit the row
window.editRow = function ()
{
    editEmployee = {"first_name": document.getElementById("fname").value, "last_name": document.getElementById("lname").value,
     "id": document.getElementById("id").value, "age": document.getElementById("age").value};

    window.updateEmployee(editEmployee)
    .then(responseData => {
        let table = document.getElementById("table");

        table.rows[rIndex].cells[0].innerHTML = editEmployee.first_name;
        table.rows[rIndex].cells[1].innerHTML = editEmployee.last_name;
        table.rows[rIndex].cells[3].innerHTML = editEmployee.age;
    
        //clean the fields
        clearFields();
    })
    .catch(err => {
        console.log(err);
    });

}

window.initClickOnRow = function ()
{
    // let i = firstRow;
    // if( i < 1)
    // {
    //     return;
    // }   
    // console.log(table.rows.length);   
    for(let i=1; i < table.rows.length; i++) {
        table.rows[i].onclick = function()
        {
            if(clickRemove == 1)
            {
                clickRemove = 0;
                return;
            }
            if(rIndex !== "undefined") 
            {
                if( deleteRow == 0 )
                {
                    table.rows[rIndex].classList.toggle("selected");
                    table.rows[rIndex].getElementsByTagName('td')[4].getElementsByTagName('button')[0].setAttribute("disabled","true");

                    if( rIndex == this.rowIndex )
                    {
                        window.clearFields();
                        rIndex = "undefined";
                        return;
                    }
                }
                else // deleteRow == 1
                {
                    deleteRow = 0;
                }
            }

            // get selected row index
            rIndex = this.rowIndex;
            // add class selected to the row
            this.classList.toggle("selected");
            this.getElementsByTagName('td')[4].getElementsByTagName('button')[0].removeAttribute("disabled");
                            
            document.getElementById("fname").value = this.cells[0].innerHTML;
            document.getElementById("lname").value = this.cells[1].innerHTML;
            document.getElementById("id").value = this.cells[2].innerHTML;
            document.getElementById("id").setAttribute('disabled', 'true');
            document.getElementById("age").value = this.cells[3].innerHTML;
        };
    }
}

window.deleteRow = function ()
{

    let answer = window.confirm("Are you sure you want to delete this employee?");
    if (!answer) {
        return;
    }

    clickRemove = 1;

    let indexToDelete = rIndex;
    window.deleteEmployee(table.rows[indexToDelete].getElementsByTagName('td')[2].innerHTML)
    .then(responseData => {        
        table.deleteRow(indexToDelete);

        deleteRow = 1;
        window.initClickOnRow();

        //clean the fields
        clearFields();
    })
    .catch(err => {
        console.log(err);
    });

}