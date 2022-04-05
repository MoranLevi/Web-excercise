let counter = 4; // rank

window.clearFields = function() {
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('age').value = "";
}

window.addRow = function() {
    // get input value
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
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
    cel1.innerHTML = counter;
    cel2.innerHTML = fname;
    cel3.innerHTML = lname;
    cel4.innerHTML = age;

    // add remove button to the last cell
    let newElem = document.createElement( 'input' );
    newElem.setAttribute("type", "button");
    newElem.setAttribute("value", "remove");
    newElem.setAttribute("onclick", 'deleteRow()')
    cel5.appendChild(newElem);

    // add one to the next rank
    counter++;

    // clean the fields
    clearFields();

    // add click on the new row
    initClickOnRow(table.rows.length-1);


}

let table = document.getElementById("table");
let rIndex;

// edit the row
window.editRow = function ()
{
    let table = document.getElementById("table");
    // let rIndex;

    console.log(rIndex);
    table.rows[rIndex].cells[1].innerHTML = document.getElementById("fname").value;
    table.rows[rIndex].cells[2].innerHTML = document.getElementById("lname").value;
    table.rows[rIndex].cells[3].innerHTML = document.getElementById("age").value;

    //clean the fields
    clearFields();
}

window.initClickOnRow = function (firstRow)
{
    console.log("init");
    let i = firstRow;
    if( i < 1)
    {
        return;
    }      
    for(; i < table.rows.length; i++) {
        table.rows[i].onclick = function()
        {

            if(typeof rIndex !== "undefined") 
            {
                console.log(rIndex);
                table.rows[rIndex].classList.toggle("selected");
            }

            // get selected row index
            rIndex = this.rowIndex;
            // add class selected to the row
            this.classList.toggle("selected");
                            
            document.getElementById("fname").value = this.cells[1].innerHTML;
            document.getElementById("lname").value = this.cells[2].innerHTML;
            document.getElementById("age").value = this.cells[3].innerHTML;
        };
    }
}

window.deleteRow = function ()
{
    // console.log("booo");
    // let table = document.getElementById("table");

    // let index2 = index;
    // console.log(index);
    // table.deleteRow(index2);
    // table.deleteRow(rIndex);
    // console.log(rIndex);

    console.log("delete");
    var td = event.target.parentNode; 
    var tr = td.parentNode; // the row to be removed
    console.log(tr);
    tr.parentNode.removeChild(tr);

    // console.log("hooo");
    // clean the fields
    // window.clearFields();

    // add click on the new row
    window.initClickOnRow(table.rows.length-1);
}