console.log('linked')
$(document).ready(function(){

$('.flip-container').on('click', function(){
  console.log('clicked');
  this.classList.toggle('flip');
})

});
