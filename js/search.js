document.querySelector('#elastic').oninput = function(){
    let val = this.value.trim();
    let elasticItems = document.querySelectorAll('.elastic .video-list__item');
    if (val != ''){
        elasticItems.forEach(function(elem)
        {
            if (elem.innerText.search(val) == -1){
                elem.classList.add('hide');
            }
        
            else {
                elem.classList.remove('hide');
            }
        });
    }
}