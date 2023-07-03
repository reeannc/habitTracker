const habits = document.querySelectorAll('.habit-btn');


habits.forEach(habit => {
    habit.addEventListener('click', () =>{
        habit.classList.add('completed');
    })
});