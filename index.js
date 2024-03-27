let addBtn=document.getElementById("submit-btn");
let cancelBtn=document.getElementById("cancel-btn");
let resetBtn=document.getElementById("reset-btn")
let recordContainer=document.querySelector(".record-container");
let deleteBtn=document.getElementById("delete-btn");
console.log(addBtn,cancelBtn,resetBtn,recordContainer,deleteBtn);

/***********************************************************************************/
let name=document.getElementById("name")
let address=document.getElementById("address")
let number=document.getElementById("contact-num")
console.log(name,address,number);

let contactArray=[];
let id=0;


//object constructor for contact
function Contact(id,name,address,number){
    this.id=id;
    this.name=name;
    this.address=address;
    this.number=number;
}

//Display availabe record
document.addEventListener('DOMContentLoaded',function(){
   if(localStorage.getItem('contacts')==null){
    contactArray=[];
   }else{
    contactArray=JSON.parse(localStorage.getItem('contacts'));
    lastID(contactArray);
   }
    displayRecord();
});


//display record
function displayRecord(){
    contactArray.forEach(function(singleContact){
        addToList(singleContact);
    });
}

//Finding the last id
function lastID(contactArray) {
    if(contactArray.length>0){
        id=contactArray[contactArray.length-1].id;
    }else{
        id=0;
    }
}

//Adding contact record
addBtn.addEventListener('click',()=>{
    if(checkInputFields([name,address,number])){
        setMessage("success","Record added successfully!");
        id++;
        let contact=new Contact(id,name.value,address.value,number.value);
        contactArray.push(contact);
        //Storing contact record in local storage
        localStorage.setItem('contacts',JSON.stringify(contactArray));
        clearInputFields();

        //Adding to list
        addToList(contact);
    }else{
        setMessage("error","Empty input fields or invalid input!");
    }
   
});

//adding to List (on the DOM)
{
    function addToList(item){
        let newRecordDiv=document.createElement('div');
        newRecordDiv.classList.add('record-item');
        newRecordDiv.innerHTML=`
    <div class="record-el">
        <span id="labelling">Contact ID: </span>
        <span id="contact-id-content">${item.id}</span>
    </div>

    <div class="record-el">
        <span id="labelling">Name: </span>
        <span id="name-content">${item.name}</span>
    </div>

    <div class="record-el">
        <span id="labelling">Address: </span>
        <span id="address-content">${item.address}</span>
    </div>

    <div class="record-el">
        <span id="labelling">Contact Number: </span>
        <span id="contact-num-content">${item.number}</span>
    </div>

    <button type="button" id="delete-btn">
        <span>
            <i class='bx bxs-trash'></i>
        </span>Delete
    </button>
        `;
        recordContainer.appendChild(newRecordDiv);
    }
}

//Deletion of Record
recordContainer.addEventListener('click',(event)=>{
    //console.log(event.target);
    if(event.target.id==='delete-btn'){
        //console.log('yes');
        //removing from DOM
        let recordItem=event.target.parentElement;
        recordContainer.removeChild(recordItem);
        let tempContactList=contactArray.filter(function(record){
            return (record.id !==parseInt(recordItem.
                firstElementChild.lastElementChild.
                textContent));
        });
        contactArray=tempContactList;
        //removing from localStorage by overwriting
        localStorage.setItem('contacts',JSON.stringify(contactArray));
    }
});

//resetting everything(id will get set to 0)
resetBtn.addEventListener("click",()=>{
    contactArray=[];
    localStorage.setItem('contacts',JSON.stringify(contactArray));
    location.reload();
})

//Display status/alerts
function setMessage(status,message){
    let messageBox=document.querySelector(".message");
    if(status=="error"){
        messageBox.innerHTML=`${message}`;
        messageBox.classList.add('error');
        removeMessage(status,messageBox);
    }
    if(status=="success"){
        messageBox.innerHTML=`${message}`;
        messageBox.classList.add('success');
        removeMessage(status,messageBox);
    }
}

//Clearing all input fields
cancelBtn.addEventListener("click",()=>{
    clearInputFields();
});

function clearInputFields(){
    name.value="";
    address.value="";
    number.value="";
}

//Removing status/alerts
function removeMessage(status,messageBox) {
    setTimeout(function(){
        messageBox.classList.remove(`${status}`);
    },2000);
}

//input field validation
function checkInputFields(inputArr){
    for(let i=0;i<inputArr.length;i++){
        if(inputArr[i].value===""){
            return false;
        }
    }
    if(!phoneNumCheck(inputArr[2].value)){
        return false;
    }
    return true;
}

//Phone number Validation function
function phoneNumCheck(inputtxt) {
    let phoneNo=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(phoneNo)){
        return true;
    }else{
        return false;
    }
}
