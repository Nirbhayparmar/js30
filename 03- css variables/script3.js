const controls = document.querySelectorAll('.controls input');

function updateValues(){
    const suffix=this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`,this.value+suffix);
    
}
controls.forEach(input => input.addEventListener('change',updateValues));
controls.forEach(input => input.addEventListener('mousemove',updateValues));