const form = document.querySelector('.form')
const savedContent = localStorage.getItem('formContent')

const contentSplit = savedContent?.split(',');

contentSplit?.forEach(content => {
    if (savedContent) form.innerHTML += content
});
let allInputes = document.querySelectorAll('.label')
// bindEventsToNewElements()

const addGoalButtom = document.querySelector('.add-goal')
let idNumber = 0
const dynamicID = ["fourthGoal", "fifthGoal"]
let newGoals = []
addGoalButtom.addEventListener('click', () => {
    if (allInputes.length < 5) {
        const goal = `<div class="input-box">
                        <span class="check-box">
                            <img src="./images/tick.svg" alt="tick icon">
                        </span>
                        <input class="label" type="text" placeholder="Add new goal..." id="${dynamicID[idNumber]}">
                    </div>`
        newGoals.push(goal)
        form.insertAdjacentHTML("beforeend", goal)
        localStorage.setItem('formContent', newGoals)
        idNumber++
        allInputes = document.querySelectorAll('.label')
        bindEventsToNewElements()
        if (allInputes.length === 5) {
            addGoalButtom.setAttribute("disabled", true)
            addGoalButtom.setAttribute("title", "You can add only total 5 goals!")
        }
    }
})

//If page load when checking the condition
if (allInputes.length === 5) {
    addGoalButtom.setAttribute("disabled", true)
    addGoalButtom.setAttribute("title", "You can add only total 5 goals!")
}

// function bindEventsToNewElements() {
//     const warningText = document.querySelector('.warning-text')
//     const allCheckboxes = document.querySelectorAll('.check-box')
//     const fillAmount = document.querySelector('.fill-color')
//     const instruction = document.querySelector('.instruction')

//     const allGoals = JSON.parse(localStorage.getItem("allGoals")) ?? {}
//     let completedGoalCount = Object.values(allGoals).filter((goals) => goals.isCompleted).length
//     fillAmount.style.width = `${(completedGoalCount / allCheckboxes.length) * 100}%`
//     fillAmount.firstElementChild.innerText = `${completedGoalCount}/${allCheckboxes.length} Completed`
//     let completedValue = (completedGoalCount / allCheckboxes.length) * 100

//     function checkCompletedStatus() {
//         if (completedValue === 0) {
//             return "Raise the bar by completing your goals!"
//         } else if (completedValue > 0 && completedValue <= 50) {
//             return "Well begun is half done!"
//         } else if (completedValue > 50 && completedValue <= 99) {
//             return "Just a step away, keep going"
//         } else if (completedValue === 100) {
//             return "Whoa! You just completed all the goals, time for chill :-)"
//         }
//     }
//     // console.log("checkCompletedStatus()", checkCompletedStatus(), completedValue);
//     instruction.innerText = checkCompletedStatus()


//     allCheckboxes.forEach((checkBox) => {
//         checkBox.addEventListener('click', () => {
//             const allFieldChecked = [...allInputes].every((input) => (input.value))
//             console.log("allFieldChecked", allFieldChecked, allInputes.length);

//             if (allFieldChecked) {
//                 checkBox.parentElement.classList.toggle('completed')
//                 const inputId = checkBox.nextElementSibling.id
//                 allGoals[inputId].isCompleted = !allGoals[inputId].isCompleted
//                 completedGoalCount = Object.values(allGoals).filter((goals) => goals.isCompleted).length
//                 fillAmount.style.width = `${(completedGoalCount / allCheckboxes.length) * 100}%`
//                 fillAmount.firstElementChild.innerText = `${completedGoalCount}/${allCheckboxes.length} Completed`
//                 completedValue = completedGoalCount / allCheckboxes.length * 100
//                 instruction.innerText = checkCompletedStatus()
//                 localStorage.setItem('allGoals', JSON.stringify(allGoals))
//             } else {
//                 warningText.style.visibility = "visible"
//             }
//         })
//     })

//     allInputes.forEach((input) => {
//         input.value = allGoals[input.id]?.goalValue ?? ""
//         if (allGoals[input.id]?.isCompleted) {
//             input.parentElement.classList.add('completed')
//         }
//         input.addEventListener('focus', () => {
//             warningText.style.visibility = "hidden"
//         })
//         input.addEventListener('input', (e) => {
//             if (allGoals[input.id]?.isCompleted) {
//                 input.value = allGoals[input.id].goalValue
//                 return
//             }
//             allGoals[e.target.id] = {
//                 goalValue: e.target.value,
//                 isCompleted: false
//             }
//             localStorage.setItem('allGoals', JSON.stringify(allGoals))
//         })
//     })
// }





function bindEventsToNewElements() {
    const warningText = document.querySelector('.warning-text');
    const fillAmount = document.querySelector('.fill-color');
    const instruction = document.querySelector('.instruction');

    const allGoals = JSON.parse(localStorage.getItem("allGoals")) ?? {};
    let completedGoalCount = Object.values(allGoals).filter((goals) => goals.isCompleted).length;
    fillAmount.style.width = `${(completedGoalCount / allInputes.length) * 100}%`;
    fillAmount.firstElementChild.innerText = `${completedGoalCount}/${allInputes.length} Completed`;
    let completedValue = (completedGoalCount / allInputes.length) * 100;

    function checkCompletedStatus() {
        if (completedValue === 0) {
            return "Raise the bar by completing your goals!";
        } else if (completedValue > 0 && completedValue <= 50) {
            return "Well begun is half done!";
        } else if (completedValue > 50 && completedValue <= 99) {
            return "Just a step away, keep going";
        } else if (completedValue === 100) {
            return "Whoa! You just completed all the goals, time for chill :-)";
        }
    }

    instruction.innerText = checkCompletedStatus();

    // Event delegation: listen to the parent `.form` and handle clicks on the checkboxes
    form.addEventListener('click', (event) => {
        if (event.target.closest('.check-box')) {
            const checkBox = event.target.closest('.check-box');
            const input = checkBox.nextElementSibling;
            const allFieldChecked = [...allInputes].every((input) => input.value);
            const inputId = input.id;

            if (allFieldChecked) {
                // Initialize allGoals[inputId] if it doesn't exist
                if (!allGoals[inputId]) {
                    allGoals[inputId] = {
                        goalValue: input.value,
                        isCompleted: false
                    };
                }

                // Toggle the 'completed' class
                checkBox.parentElement.classList.toggle('completed');
                allGoals[inputId].isCompleted = !allGoals[inputId].isCompleted;

                // Update completedGoalCount and UI elements
                completedGoalCount = Object.values(allGoals).filter((goals) => goals.isCompleted).length;
                fillAmount.style.width = `${(completedGoalCount / allInputes.length) * 100}%`;
                fillAmount.firstElementChild.innerText = `${completedGoalCount}/${allInputes.length} Completed`;
                completedValue = (completedGoalCount / allInputes.length) * 100;
                instruction.innerText = checkCompletedStatus();
                localStorage.setItem('allGoals', JSON.stringify(allGoals));
            } else {
                warningText.style.visibility = "visible";
            }
        }
    });
}

// Call this function once, and it'll handle clicks for all future checkboxes
bindEventsToNewElements();