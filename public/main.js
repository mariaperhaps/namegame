console.log('linked')
$(document).ready(function(){

var flipContainer = document.querySelector('.flip-container');
flipContainer.addEventListener('click', function(){
  this.classList.toggle('flip');
})


$('button').on('click', function(){
  var containers = $('.flip-container')
  for(var i = 0; i < containers.length; i++){
    containers[i].classList.toggle('flip');
  }
})

});
