const d = document;
const toggleTheme = d.getElementById("toggle-theme");
const toggleIcon = d.getElementById("toggle-icon");
const toggleText = d.getElementById("toggle-text");
const toggleColors=d.getElementById('toggle-colors');
const flagsElement = d.getElementById("flags");

const rootStyle = d.documentElement.style;

const textsToChange = d.querySelectorAll("[data-section]")

const changeLanguge = async (language)=>{
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();
    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML=texts[section][value];
    }
} 



toggleTheme.addEventListener("click", ()=>{
    d.body.classList.toggle('dark');
    if(toggleIcon.src.includes('moon.svg')){
        toggleIcon.src='assets/icons/sun.svg'
        toggleText.textContent='Light Mode'
    }else{
        toggleIcon.src='assets/icons/moon.svg'
        toggleText.textContent='Night Mode'

    }
    
})


if(localStorage.getItem('setColor')){
    rootStyle.setProperty('--primary-color',localStorage.getItem('setColor'))
}

toggleColors.addEventListener('click',(e)=>{
    let setColor=(e.target.dataset)
    rootStyle.setProperty('--primary-color', e.target.dataset.color)
    localStorage.setItem('setColor', setColor.color)
 
})

flagsElement.addEventListener('click',(e)=>{
    changeLanguge(e.target.parentElement.dataset.language)

})




