// let counter = 4; // rank

window.clearFields = function() {
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('id').value = "";
    document.getElementById('age').value = "";
}

window.addRow = function() {
    // get input value
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let id = document.getElementById('id').value;
    let age = document.getElementById('age').value;

    // get the html table
    // 0 = the first table
    let table = document.getElementsByTagName('table')[0];

    // add new empty row to the table
    // table.rows.length = in the end
    let newRow = table.insertRow(table.rows.length);

    // add cells to the row
    let cel1 = newRow.insertCell(0);
    let cel2 = newRow.insertCell(1);
    let cel3 = newRow.insertCell(2);
    let cel4 = newRow.insertCell(3);
    let cel5 = newRow.insertCell(4);

    // add values to the cells
    // cel1.innerHTML = counter;
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

    // add one to the next rank
    // counter++;

    // clean the fields
    clearFields();

    // add click on the new row
    initClickOnRow();


}

let table = document.getElementById("table");
let rIndex;
let deleteRow = 0; // symbolized that delete row. Do this for the first row after delete
let clickRemove = 0; // symbolized that click on remove button. Do this for the select row to delete.

// edit the row
window.editRow = function ()
{
    let table = document.getElementById("table");

    console.log(rIndex);
    table.rows[rIndex].cells[0].innerHTML = document.getElementById("fname").value;
    table.rows[rIndex].cells[1].innerHTML = document.getElementById("lname").value;
    table.rows[rIndex].cells[3].innerHTML = document.getElementById("age").value;

    //clean the fields
    clearFields();
}

window.initClickOnRow = function ()
{
    console.log("init");
    // let i = firstRow;
    // if( i < 1)
    // {
    //     return;
    // }   
    console.log(table.rows.length);   
    for(let i=1; i < table.rows.length; i++) {
        table.rows[i].onclick = function()
        {
            if(clickRemove == 1)
            {
                clickRemove = 0;
                return;
            }
            if(typeof rIndex !== "undefined") 
            {
                console.log("boooo");
                console.log(rIndex);
                if( deleteRow == 0 )
                {
                    table.rows[rIndex].classList.toggle("selected");
                    table.rows[rIndex].getElementsByTagName('td')[4].getElementsByTagName('button')[0].setAttribute("disabled","true");
                }
                else // deleteRow == 1
                {
                    deleteRow = 0;
                }
            }

            // get selected row index
            rIndex = this.rowIndex;
            // add class selected to the row
            console.log("hoo");
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
    table.deleteRow(indexToDelete);

    deleteRow = 1;
    window.initClickOnRow();
}