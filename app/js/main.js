const toggleDrawer = () => {
    const drawerClassList = event.target.classList
    const navClassList = document.querySelectorAll('.header-navbar')[0].classList

    drawerClassList.toggle('opened')
    navClassList.toggle('opened')
}

const toggleDropdown = () => {
    event.stopPropagation()
    if(event.target.querySelector('.dropdown-list')){
        const dropDownClassList = event.target.querySelector('.dropdown-list').classList
        
        dropDownClassList.toggle('opened')
    } 

    else if (event.target.classList.contains('dropdown-button')){
        event.target.nextElementSibling.classList.toggle('opened')
    }

}