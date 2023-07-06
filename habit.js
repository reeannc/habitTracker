//Query Selectors
const habits = document.querySelectorAll('.habit-btn');
const themeBtn = document.querySelector('#theme');
const modalContainer = document.querySelector('.modal-container');
const habitContainer = document.querySelector('.habit-container');
const createHabitBtn = document.querySelector('.new-habit__add');
const newHabitTitle = document.querySelector('#title');
const icons = document.querySelectorAll('.icon');
const addBtn = document.querySelector('#add');
const cancelBtn = document.querySelector('#cancel');
let habitToBeDeleted;
const deleteBtn = document.querySelector('#delete');
const contextMenu = document.querySelector('.context-menu');

//functions

const storage = {
    saveTheme(value){
    localStorage.setItem('habitsapp.theme', `${value}`);
    },
    checkTheme(){
        return localStorage.getItem('habitsapp.theme');
    },
    saveHabit(object){
        const currentHabits = storage.getHabits();
        if(currentHabits === null || currentHabits === ''){
            localStorage.setItem('habitsapp.habits', JSON.stringify(object));
        }else{
            currentHabits.push(object);
            localStorage.setItem('habitsapp.habits', JSON.stringify(currentHabits));
        }
    },
    getHabits(){
        let currentHabits;
        if(localStorage.getItem('habitsapp.habits') === null){
            currentHabits = [];   
        }else{
            currentHabits = JSON.parse(localStorage.getItem('habitsapp.habits'));
        }
        return currentHabits;
    },
    habitStatus(id){
        const currentHabits = storage.getHabits();
        currentHabits.forEach(habit =>{
            if(habit.id !== Number(id))return;
            habit.completed === true ? habit.completed = false : habit.completed = true;
        });
        localStorage.setItem('habitsapp.habits', JSON.stringify(currentHabits));
    }
}

const ui = {
    theme(){
        themeBtn.classList.toggle('dark');
        const root = document.querySelector(':root');
        root.classList.toggle('dark');
        themeBtn.classList.contains('dark') 
        ? storage.saveTheme('dark')
        : storage.saveTheme('light');
    },
    openModal(){
        modalContainer.classList.add('active');
        modalContainer.setAttribute('aria-hidden', 'false');
        newHabitTitle.focus();
    },
    closeModal(){
        modalContainer.classList.remove('active');
        modalContainer.setAttribute('aria-hidden', 'true');
        newHabitTitle.value ="";
        ui.removeSelectedIcon();
    },
    removeSelectedIcon(){
        icons.forEach(icon => {
            icon.classList.remove('selected');
        })
    },
    addNewHabit(title, icon, id, completed){
        const habitDiv = document.createElement('div');
        habitDiv.classList.add('habit');
        habitDiv.innerHTML = `
        <button class="habit-btn ${completed === true ? 'completed' : ''}" data-id="${id}" data-title="${title}">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          ${icon}
        </svg>
      </button>
      `;
        habitContainer.appendChild(habitDiv);
      },
      refreshHabits(){
        const uiHabits = document.querySelectorAll('.habit');
        uiHabits.forEach(habit => habit.remove());
        const currentHabits = storage.getHabits();
        
        currentHabits.forEach(habit => {
          ui.addNewHabit(habit.title, habit.icon, habit.id, habit.completed);
        });
        console.table(currentHabits);
      }
}


//event listeners

//event: window load

window.addEventListener('DOMContentLoaded', () => {
    //Load theme
    const theme = storage.checkTheme();
    if(theme === 'dark') ui.theme();
    
    //update uI
    ui.refreshHabits();
  })

//event: theme button
themeBtn.addEventListener('click', ui.theme);

//event: add habit btn
createHabitBtn.addEventListener('click', ui.openModal);

//event: close modal
cancel.addEventListener('click', ui.closeModal);

//event: selected icon
icons.forEach(icon => {
    icon.addEventListener('click', ()=>{
        ui.removeSelectedIcon();
        icon.classList.add('selected');
    });
})

//event: add new habit btn
addBtn.addEventListener('click', ()=> {
   const habitTitle = newHabitTitle.value;
    let habitIcon;
    icons.forEach(icon => {
      if(!icon.classList.contains('selected')) return;
      habitIcon = icon.querySelector('svg').innerHTML;
    });
    const habitID = Math.random();
    ui.addNewHabit(habitTitle, habitIcon, habitID);
    ui.closeModal();
    const habit = {
        title: habitTitle,
        icon: habitIcon,
        id: habitID,
        completed: false,
    };
    storage.saveHabit(habit);
});
storage.save

//event: complete habit
habitContainer.addEventListener('click', e =>{
    if(!e.target.classList.contains('habit-btn'))return;
    e.target.classList.toggle('completed');
    storage.habitStatus(e.target.dataset.id);
    });

//event: context menu
habitContainer.addEventListener('contextmenu', e =>{
    if(!e.target.classList.contains('habit-btn')) return;
    e.preventDefault();
    habitToBeDeleted = e.target.dataset.id;
    const { clientX: mouseX, clientY: mouseY} = e;
    contextMenu.style.top = `${mouseY}px`;
    contextMenu.style.left = `${mouseX}px`;
    const contextTitle = document.querySelector('#habitTitle');
    contextTitle.textContent = e.target.dataset.title;
    contextMenu.classList.add('active');
})