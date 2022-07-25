class All{
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
    }



    taskRangeShow(){
        const {taskRnageShowFiled, taslRangeELm} = this.allSelectors()
        taskRnageShowFiled.value = taslRangeELm.value;
        taslRangeELm.addEventListener('change', e => {
            taskRnageShowFiled.value = e.target.value;
        })
    }

    initialize(){

        

        let taskArr = []
        
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
            const dataObj = this.dataStoreInArray()

            taskArr.push(dataObj)
            this.dataSendLocalStorage(taskArr)
        })           
    }

    dataSendLocalStorage(taskArr){
        // console.log(taskArr);

            let localArr = []
            

            console.log(!localStorage.getItem('Task'));

        // if(!localStorage.getItem('Task')){
        //     console.log(true);
        // }else{
        //     console.log(false);
        // }
       
        


        
    }

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

        return taskId

    }

    dataStoreInArray(){

        const taskId = this.dataInsertField()
        
        const {taskTitleValue,
            taskSubTitleValue,
            assignedToValue,
            taskStartDateValue,
            taskEndDateValue,
            priorityValue,
            taskStatusValue,
            taslRangeELmValue} = this.storeAllValue();

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

        return dataObj
    }

    validationField(){

        const {taskTitleValue, taskSubTitleValue, assignedToValue,taskStartDateValue, taskEndDateValue} = this.storeAllValue()

       let isError = false

        if(taskTitleValue == '' && taskSubTitleValue == '' && assignedToValue == '' && taskStartDateValue == '' && taskEndDateValue == ''){
            isError = true
        }else{
            isError = false
        }

        return isError
    }

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

const all = new All()
all.initialize()
all.taskRangeShow()