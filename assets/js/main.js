let taskArr = []
const localStorageInit = {
    
    sendTaskLocalStorage(taskObj){
    let localTaskArr = [];
        
        if(localStorage.getItem('Task')){

            localTaskArr = JSON.parse(localStorage.getItem('Task'))
            localTaskArr.push(taskObj)
            localStorage.setItem('Task',JSON.stringify(localTaskArr))

        }else{
            localTaskArr = []
            localTaskArr.push(taskObj)
            localStorage.setItem('Task', JSON.stringify(localTaskArr))
        }
        
    }
}

const all = {
    allSelectors(){
        const taskTitle = document.querySelector('#taskTitle')
        const taskSubTitle = document.querySelector('#subTitle')
        const assignedTo = document.querySelector('#assign')
        const taskStartDate = document.querySelector('#startDate')
        const taskEndDate = document.querySelector('#endDate')
        // const lowPriorityElm = document.querySelector('#lowPriority')
        // const mediumPriorityElm = document.querySelector('#mediumPriority')
        // const highPriorityElm = document.querySelector('#highPriority')
        // const newTaskElm = document.querySelector('#newTask')
        // const progressTaskElm = document.querySelector('#progressTask')
        // const completeTaskElm = document.querySelector('#completeTask')
        const taskPriorityElm = document.querySelectorAll('#priorityGroup input')
        const taskStatusElm = document.querySelectorAll('#statusGroup input')
        const taslRangeELm = document.querySelector('#taskRange');
        const taskRnageShowFiled = document.querySelector('.taskrangefield');
        const form = document.querySelector('form')
        
        // const taskIdField = document.querySelector('#taskId')
        // const taskTitleField = document.querySelector('#taskTitlefield')
        // const taskPriorityField = document.querySelector('#taskPriority')

        return{
            taskTitle,
            taskSubTitle,
            assignedTo,
            taskStartDate,
            taskEndDate,
            // lowPriorityElm,
            // mediumPriorityElm,
            // highPriorityElm,
            // newTaskElm,
            // progressTaskElm,
            // completeTaskElm,
            taskPriorityElm,
            taskStatusElm,
            form,
            taslRangeELm,
            taskRnageShowFiled
        }
    },

    taskRangeShow(){
        const {taskRnageShowFiled, taslRangeELm} = this.allSelectors()
        taskRnageShowFiled.value = taslRangeELm.value;
        taslRangeELm.addEventListener('change', e => {
            taskRnageShowFiled.value = e.target.value;
        })
    },

    initialize(){ 
        const {form} = this.allSelectors()

        form.addEventListener('submit', e => {
            e.preventDefault()
            const isError = this.validationField()
            // console.log(isError);

            if(isError){
                  alert('Field Missing')
            }else{

                const {taskTitleValue,taskSubTitleValue,assignedToValue,taskStartDateValue,taskEndDateValue, priorityValue, taskStatusValue ,taslRangeELmValue } = this.storeAllValue()

                this.dataInsertField(taskTitleValue,taskSubTitleValue,assignedToValue,taskStartDateValue,taskEndDateValue,priorityValue, taskStatusValue, taslRangeELmValue)

                

            }
            
        })   
        
        document.addEventListener('DOMContentLoaded', () => {
            
            if(localStorage.getItem('Task')){
                const taskFromStorage = JSON.parse(localStorage.getItem('Task'))

            taskFromStorage.map( task => {
                const tr = document.createElement('tr')

                tr.innerHTML = `
            <td id="taskId">${task.TaskId}</td>
            <td>${task.taskTitle}</td>
            <td>${task.Priority}</td>
            <td>${task.Status}</td>
            <td>${task.EndDate}</td>
            <td>${task.Assigned}</td>
            <td>${task.CompleteRange}%</td>
            <td><i id="editBtn" class="fa fa-pencil-square-o" aria-hidden="true"></i> <i id="completeBtn" class="fa fa-check-square" aria-hidden="true"></i>
            <i id="deleteBtn" class="fa fa-trash" aria-hidden="true"></i></td>
                `
                document.querySelector('table tbody').appendChild(tr)
            })
            }
            // =================
            const allTask = JSON.parse(localStorage.getItem('Task'))
            const deleteBtn = document.querySelectorAll('#deleteBtn');
            const editBtn = document.querySelectorAll('#editBtn');
            const completeBtn = document.querySelectorAll('#completeBtn')
    
            const {taskTitle, taskSubTitle, assignedTo, taskStartDate, taskEndDate,taskPriorityElm,taskStatusElm, taslRangeELm} = this.allSelectors()

            for(let i = 0; i < editBtn.length; i++){
                editBtn[i].addEventListener('click', () => {
                    document.querySelector('#updateBtnElm').style.display = "inline-block"
                    const allTaskId = document.querySelectorAll('#taskId')
                   allTask.find( elem => {
                    if(elem.TaskId === Number(allTaskId[i].textContent)){
                        
                        taskTitle.value = elem.taskTitle
                        taskSubTitle.value = elem.taskSubTitle
                        assignedTo.value = elem.Assigned
                        taskStartDate.value = elem.StartDate
                        taskEndDate.value = elem.EndDate
                        taskPriorityElm.value = elem.Priority
                        taskStatusElm.value = elem.Status
                        taslRangeELm.value = elem.CompleteRange
                    }
                   })
                })
            }

            for(let i = 0; i < deleteBtn.length; i++){
                deleteBtn[i].addEventListener('click', () => {
                    const allTaskId = document.querySelectorAll('#taskId')
                    
                })
            }

            for(let i = 0; i < completeBtn.length; i++){
                completeBtn[i].addEventListener('click', () => {
                    const allTaskId = document.querySelectorAll('#taskId')
                })
            }  

        })
    },

    dataSendLocalStorage(taskArr){
        // console.log(taskArr);

            let localArr = []
            

            console.log(!localStorage.getItem('Task'));

        // if(!localStorage.getItem('Task')){
        //     console.log(true);
        // }else{
        //     console.log(false);
        // }
       
        


        
    },

    dataInsertField(taskTitleValue,taskSubTitleValue,assignedToValue,taskStartDateValue,taskEndDateValue,  priorityValue, taskStatusValue, taslRangeELmValue){

        

        const tr = document.createElement('tr')

        const taskId = document.querySelectorAll('#taskId').length+1;


        tr.innerHTML = `
            <td id="taskId">${taskId}</td>
            <td>${taskTitleValue}</td>
            <td>${priorityValue}</td>
            <td>${taskStatusValue}</td>
            <td>${taskEndDateValue}</td>
            <td>${assignedToValue}</td>
            <td>${taslRangeELmValue}%</td>
            <td><i id="editBtn" class="fa fa-pencil-square-o" aria-hidden="true"></i> <i id="completeBtn" class="fa fa-check-square" aria-hidden="true"></i>
            <i id="deleteBtn" class="fa fa-trash" aria-hidden="true"></i></td>
        `
        document.querySelector('table tbody').appendChild(tr)
         // ===================


        const deleteBtn = document.querySelectorAll('#deleteBtn');
        const editBtn = document.querySelectorAll('#editBtn');
        const completeBtn = document.querySelectorAll('#completeBtn')

        return {deleteBtn, editBtn, completeBtn}

    },

   
    dataStoreInObj(taskId,taskTitleValue,taskSubTitleValue,assignedToValue,taskStartDateValue,taskEndDateValue,  priorityValue, taskStatusValue, taslRangeELmValue){
        
        let dataObj = {
            TaskId : taskId,
            taskTitle : taskTitleValue,
            taskSubTitle : taskSubTitleValue,
            Assigned : assignedToValue,
            StartDate : taskStartDateValue,
            EndDate : taskEndDateValue,
            Priority : priorityValue,
            Status : taskStatusValue,
            CompleteRange : taslRangeELmValue
        }
        // console.log(dataObj);
        
        taskArr.push(dataObj)
        
    },

    validationField(){

        const {taskTitleValue, taskSubTitleValue, assignedToValue,taskStartDateValue, taskEndDateValue} = this.storeAllValue()

       let isError = false

        if(taskTitleValue == '' && taskSubTitleValue == '' && assignedToValue == '' && taskStartDateValue == '' && taskEndDateValue == ''){
            isError = true
        }else{
            isError = false
        }

        return isError
    },

    storeAllValue(){
       
        const {taskTitle, taskSubTitle, assignedTo, taskStartDate, taskEndDate, taskPriorityElm,
            taskStatusElm, taslRangeELm} = this.allSelectors()

        const taskTitleValue = taskTitle.value;
        const taskSubTitleValue = taskSubTitle.value;
        const assignedToValue = assignedTo.value;
        const taskStartDateValue = taskStartDate.value;
        const taskEndDateValue =taskEndDate.value;
        let priorityValue = ''
        let taskStatusValue = ''
        const taslRangeELmValue = taslRangeELm.value;

        for(let i = 0; i < taskPriorityElm.length; i++){
            if(taskPriorityElm[i].checked){
                priorityValue = taskPriorityElm[i].value
            }
        }

        for(let i = 0; i < taskStatusElm.length; i++ ){
            if(taskStatusElm[i].checked){
                taskStatusValue = taskStatusElm[i].value
            }
        }

        return {
            taskTitleValue,
            taskSubTitleValue,
            assignedToValue,
            taskStartDateValue,
            taskEndDateValue,
            priorityValue,
            taskStatusValue,
            taslRangeELmValue
        }
    }
}

all.initialize()
all.taskRangeShow()