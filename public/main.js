console.log('linked')


$(document).ready(function(){

$('.flip-container').on('click', function(){
  console.log('clicked');
  this.classList.toggle('flip');
})


$('button').on('click', function(){
  var containers = $('.flip-container')
  for(var i = 0; i < containers.length; i++){
    containers[i].classList.toggle('flip');
  }
})

});
