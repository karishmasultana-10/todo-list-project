// <------------------------------------------ TODO LIST APP -------------------------------------------------------->



// ============================================
// GETTING ELEMENTS
// ============================================

let taskInput=document.getElementById("todotask");
let UIlist=document.getElementById("mylist");
let dueDate=document.getElementById("duedate");
let clrcmpltd=document.getElementById("clrcmpltd");

let todoList=[];



// ============================================
// LOCAL STORAGE RETRIEVAL
// ============================================

// retrieving the data from local storage and converting it back to array

let retrievedData=localStorage.getItem('myData');

if(retrievedData){

    todoList=JSON.parse(retrievedData);
    console.log(todoList);

    // for(let i=0;i<todoList.length;i++){

    // UILogic(todoList[i],i);

    // }

}

renderTasks(todoList);
taskCounter();




// ============================================
// UI LOGIC
// ============================================

function UILogic(task,index){

    // creating the list item and adding the task to the list

    let list=document.getElementById("mylist");

    let newItem=document.createElement("li");

    let spanelmnt=document.createElement("span") ;

    // list.innerHTML+="<li>"+task+"</li>";{

    spanelmnt.innerHTML=`${task.text}<br><small>Due: ${task.due}</small>`;


    // to display on the ui we are checking the status and applyig the class

    if(task.completed){

        newItem.classList.add("completed");

    }


    // here we are storing the index value of the task in the data attribute of the list item so that we can use it later to remove the task from the array when we click on the delete button

    newItem.dataset.taskIndex=index;



    // ============================================
    // BUTTON BOX
    // ============================================

    let btnbox=document.createElement("div");

    btnbox.classList.add("btnbox");



    // ============================================
    // DELETE BUTTON
    // ============================================

    // adding delete button

    let dltbtn=document.createElement("button");

    dltbtn.classList.add("dltbtn");

    dltbtn.textContent="Delete";

    btnbox.appendChild(dltbtn);



    // function to writ ethe onclick event for delete button

    dltbtn.onclick=function(event){

        let frstprnt=dltbtn.parentElement;

        // here we are getting the parent element of the delete button which is the list item and then we are removing that list item

        let parent=frstprnt.parentElement;

        // “Even if I click inside child (button), don’t trigger parent’s event (like <li>.onclick)”

        event.stopPropagation();

        // here we are getting the index value of the task from the data attribute of the list item and then we are using that index value to remove the task from the array

        let indexValue=parent.dataset.taskIndex;

        // here we are removing the element from the array as well using splice method and passing the index value which we have stored in the data attribute of the list item

        todoList.splice(+indexValue,1);

        // converting the array to string and then storing it in local storage because local storage can only store string data so we have to convert the array to string before storing it in local storage

        let todoListString=JSON.stringify(todoList);

        localStorage.setItem("myData",todoListString);

        // list.innerHTML="";
        // for(let i=0;i<todoList.length;i++){
        //     UILogic(todoList[i],i);
        // }

        renderTasks(todoList);

        console.log(todoList);

        taskCounter();

    }



    // ============================================
    // MARKING TASK AS DONE
    // ============================================

    newItem.onclick=function(){

        // newItem.classList.toggle("completed");

        //it works in back and forth momvement

        //instaed of using the if else block we can use only one line as here

        // if(newItem.classList.contains("completed")){
        // newItem.classList.remove("completed");
        // }

        // else{
        // newItem.classList.add("completed");
        // }

        // getting th estatus of the item through index and applying the class i.e completed in array

        // if(todoList[index].completed===true){

        //     todoList[index].completed=false;

        //     }

        // else{
        //     todoList[index].completed=true;

        // }

        todoList[index].completed=!todoList[index].completed;

        console.log(todoList);

        localStorage.setItem("myData",JSON.stringify(todoList));

        renderTasks(todoList);

        taskCounter();

    };



    // ============================================
    // EDIT BUTTON
    // ============================================

    // adding edit button

    let editbtn=document.createElement("button");

    editbtn.classList.add("editbtn");

    editbtn.textContent="Edit";

    btnbox.appendChild(editbtn);



    // function to write the onclick event for edit button

    editbtn.onclick=function(event){

        let firstprnt=editbtn.parentElement;

        // here we are getting the parent element of the edit button which is the list item and then we are editing that list item

        let parnt=firstprnt.parentElement;

        event.stopPropagation();

        // here we are getting the index value of the task from the data attribute of the list item and then we are using that index value to edit the task from the array

        let prntindx=parnt.dataset.taskIndex;

        // here we are getting the existing index value of the task from the array using the index value which we have stored in the data attribute of the list item and then we are using that existing index value to edit the task from the array

        let exstngindx=todoList[prntindx];

        let updtdText=prompt('Edit the task', exstngindx.text);

        // console.log(updtdText);


        // here we are checking if the user has entered the updated text or not if the user has entered the updated text then we are updating the task in the array and then we are updating the local storage and then we are updating the UI if the user has not entered the updated text then we are not doing anything and returning null

        if(updtdText){

            task.text=updtdText;

            console.log(todoList);

            localStorage.setItem('myData', JSON.stringify(todoList));

            // list.innerHTML='';
            // for(let i=0;i<todoList.length;i++){
            //     UILogic(todoList[i],i);
            // }

            renderTasks(todoList);

        }

        else{

            return null;

        }

    };



    // ============================================
    // APPENDING ELEMENTS
    // ============================================

    newItem.appendChild(spanelmnt);

    newItem.appendChild(btnbox);


    // adding the list item to the list

    list.appendChild(newItem);

}




// ============================================
// ADD TASK FUNCTION
// ============================================

function addTask(){

    // trim chops th eextra space of the words

    let task=taskInput.value.trim();
    let capitalizedTask=task.charAt(0).toUpperCase()+task.slice(1);
    
    

    let date=dueDate.value;



    // VALIDATING THE INPUT

    if(task==="" ){

        alert("Please enter the task");

        return;

    }

    if(task.length<3){

        alert("Please enter the valid task");

        return;

    }

    if(date===''){

        alert("Enter the due date");

        return;

    }



    let slecteddate=new Date(date);

    let today=new Date();

    today.setHours(0,0,0,0);

    if(slecteddate<today){

        alert("Enter the valid date");

        dueDate.value="";

        return;

    }



    // checking for duplicate tasks

    for(let i=0;i<todoList.length;i++){

        // here we are checking if the task which we are trying to add is already present in the array or not if it is already present in the array then we are showing the alert message and then we are returning null if it is not present in the array then we are adding the task to the array

        if(task.toLowerCase()===todoList[i].text.toLowerCase()){

            alert("Stop adiing duplicate tasks!");

            // here we are clearing the input field after showing the alert message because if the user is trying to add the duplicate task then we are showing the alert message and then we are clearing the input field so that the user can enter the new task without having to delete the existing text in the input field

            taskInput.value="";

            return;

        }

    }



    //ADDING TH EELEMENTS TO ARRAY

    todoList.push({text: capitalizedTask, completed: false, due: date});

    console.log(todoList);

    // let index=todoList.length-1;

    renderTasks(todoList);

    // UILogic(todoList[index],index);

    // converting the array to string and then storing it in local storage because local storage can only store string data so we have to convert the array to string before storing it in local storage

    let todoListString=JSON.stringify(todoList);

    // storing the tasks in local storage

    localStorage.setItem("myData",todoListString);

    taskCounter();



    // clearing the input field after adding the task

    taskInput.value="";

    dueDate.value="";

}




// ============================================
// ENTER KEY EVENT
// ============================================

// listen to the input

taskInput.addEventListener("keydown",function(event){

    //here the event listner is adde to the elemnt where we are getting th euser enered input and teh event whcih we are performing here is keyboard event so keydown is there

    if(event.key==="Enter"){

        //here event is the object whci gets the info of what key is pressed after getting that we are verifying with if blco and running the func

        addTask();

    }

    console.log("key pressed");

});




// ============================================
// CLEAR ALL BUTTON
// ============================================

// let UIlist=document.getElementById("mylist");

let clearButton=document.getElementById("clearAll");

clearButton.onclick=function(event){

    todoList=[];

    console.log(todoList);

    // here we are clearing the UI by setting the innerHTML of the list to an empty string and then we are clearing the local storage by removing the item from the local storage and then we are calling the task counter function to update the task counter on the UI after clearing all the tasks

    UIlist.innerHTML="No Taks Yet!";

    taskCounter();

    localStorage.removeItem('myData');

};




// ============================================
// TASK COUNTER
// ============================================

function taskCounter(){

    let counter= document.getElementById("taskcntr");

    let pendingCount=0;

    // here we are iterating through the array of tasks and checking if the task is completed or not if the task is not completed then we are incrementing the pending count by 1 and then we are displaying the pending count on the UI

    for(let i=0;i<todoList.length;i++){

        if(!todoList[i].completed){

            pendingCount++;

        }

    }

    counter.textContent=("Total Tasks : "+ pendingCount);

    console.log("Total Tasks:", pendingCount);

}




// ============================================
// RENDER TASKS
// ============================================

function renderTasks(tasksArray){

    UIlist.innerHTML="";

    if(tasksArray.length===0){

        UIlist.innerHTML='<li>NO TASKS YET!</li>';

        return;

    }

    else{

        for(let i=0;i<tasksArray.length;i++){

            let originalIndex=todoList.indexOf(tasksArray[i]);

            UILogic(tasksArray[i],originalIndex);

        }

    }

}




// ============================================
// FILTER BUTTONS
// ============================================

let allbtn=document.getElementById("all");

allbtn.onclick=function(event){

    renderTasks(todoList);

    clrcmpltd.style.display='none';

};




let compltdbtn=document.getElementById("completed");

compltdbtn.onclick=function(event){

    let complttasks=[];

    for(let i=0;i<todoList.length;i++){

        if(todoList[i].completed){

            complttasks.push(todoList[i]);

            // UILogic(todoList[i], i);

        }

        // else{
        //     return ("No completed tasks")
        // }

    }

    renderTasks(complttasks);

    clrcmpltd.style.display='inline-block';

};




let pendngbtn=document.getElementById("pending");

pendngbtn.onclick=function(event){

    let pndgtasks=[];

    for(let i=0;i<todoList.length;i++){

        if(!todoList[i].completed){

            pndgtasks.push(todoList[i]);

        }

    }

    renderTasks(pndgtasks);

    clrcmpltd.style.display='none';

};




// ============================================
// SEARCH TASK
// ============================================

let inputsearch=document.getElementById("tasksearch");

inputsearch.addEventListener("input",function(event){

    let inputtext=inputsearch.value;

    let lwrinptxt=inputtext.toLowerCase();

    let fltrarray=[];

    for(let i=0;i<todoList.length;i++){

        let lwrcasearr=todoList[i].text.toLowerCase();

        if(lwrcasearr.includes(lwrinptxt)){

            fltrarray.push(todoList[i]);

        }

    }

    renderTasks(fltrarray);

});




// ============================================
// CLEAR COMPLETED TASKS
// ============================================

clrcmpltd.onclick=function(event){

    let pndgkpr=[];

    for(let i=0;i<todoList.length;i++){

        if(!todoList[i].completed){

            pndgkpr.push(todoList[i]);

        }

    }

    todoList=pndgkpr;

    console.log(todoList);

    localStorage.setItem("myData",JSON.stringify(todoList));

    renderTasks([]);

};