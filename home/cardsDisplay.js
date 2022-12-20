
function gridView(){
    var container = document.getElementById("movieContainer");
    var card = container.getElementsByClassName('movieCard');
    document.getElementById('grid').className = 'gridViewBtn active';
    document.getElementById('list').className = 'listViewBtn';
    container.className = 'movieContainer grid';
    for (var i=0;i<card.length;i++) {
        card[i].className = 'movieCard grid';
    }
}

function listView(){
    var container = document.getElementById("movieContainer");
    var card = container.getElementsByClassName('movieCard');
    document.getElementById('grid').className = 'gridViewBtn';
    document.getElementById('list').className = 'listViewBtn active';
    container.className = 'movieContainer list'
    for (var i=0;i<card.length;i++) {
        card[i].className = 'movieCard list'
    }
}
    


