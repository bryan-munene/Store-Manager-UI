function previewFile(){
          var preview = document.querySelector('img'); //selects the query named img
          var file    = document.querySelector('input[type=file]').files[0]; //sames as here
          var reader  = new FileReader();

          reader.onloadend = function () {
           preview.src = reader.result;
          }

          if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
          } 
          else {
           preview.src = "";
          }
        }


function deleteRow() {
          try {
          var table = document.getElementById("Sales");
          var rowCount = table.rows.length;
    
          for(var i=0; i<rowCount; i++) {
            var row = table.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            if(null != chkbox && true == chkbox.checked) {
              table.deleteRow(i);
              rowCount--;
              i--;
            }
    
    
          }
          }catch(e) {
            alert(e);
          }
        }
    