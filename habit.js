//Query Selectors
const habits = document.querySelectorAll('.habit-btn');
const themeBtn = document.querySelector('#theme');

//functions

const storage = {

}

const ui = {
    theme(){
        themeBtn.classList.toggle('dark');
        const root = document.querySelector(':root');
        root.classList.toggle('dark');
    }
}


//event listeners

//event: theme button
themeBtn.addEventListener('click', ui.theme);

//delete
habits.forEach(habit => {
    habit.addEventListener('click', () =>{
        habit.classList.toggle('completed');
    })
});