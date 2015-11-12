// var deletePostElements = document.getElementById("deletePostButton");
// for (var i = 0, len = deletePostElements.length; i < len; i++) {
//     deletePostElements[i].onclick = function() {
//         var check = confirm("Are you sure you want to delete?");
//         if (check == true) {
//             return true;
//         }
//         else {
//             return false;
//         }
//     };
// }

function deletePostPopup() {
    var check = confirm("Are you sure you want to delete?");
    if(check){
        return true;
    }
    else {
        return false;
    }
}