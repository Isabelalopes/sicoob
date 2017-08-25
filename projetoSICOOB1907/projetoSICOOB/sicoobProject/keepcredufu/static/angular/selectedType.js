var selectTipos = document.getElementById('fileType');
var divRetificada = document.querySelector('div[data-name="retificada"]');

selectTipos.addEventListener('change', function () {
    var escolhido = this.options[this.selectedIndex].dataset.section;
    divRetificada.classList[escolhido == 'retificada' ? 'add' : 'remove']('mostrar');
});