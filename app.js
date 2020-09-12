var list = document.getElementById("list")


firebase.database().ref('todos').on('child_added',function(data){
     
    
    
    var li = document.createElement("li") 
    var liText = document.createTextNode(data.val().value)  
    li.setAttribute("class", "liBtn")
    li.appendChild(liText)



    var btn =  document.createElement("button") 
    var btnText =  document.createTextNode("DELETE")
    btn.setAttribute("class", "delbtn")
    btn.setAttribute("id",data.val().key)
    btn.setAttribute("onclick", "delItem (this)")
    btn.appendChild(btnText)


    var editBtn = document.createElement("button")
    var editText = document.createTextNode("EDIT")
    editBtn.appendChild(editText)
    editBtn.setAttribute("onclick", "edit(this)")
    editBtn.setAttribute("id",data.val().key)
    editBtn.setAttribute("class" , "edit")
    li.appendChild(editBtn)
    li.appendChild(btn)
    list.appendChild(li)
    
})



function addTodo(){
    var todoItem = document.getElementById("todo-item")  
    var database = firebase.database().ref('todos')
    var key = database.push().key;
    var todo = {
    value : todoItem.value,
    key : key
    }
    database.child(key).set(todo)

 todoItem.value = ("") 
 }



 
function delItem (a){
    firebase.database().ref('todos').child(a.id).remove()
    a.parentNode.remove()

}
function deleteAll(){
    firebase.database().ref('todos').remove()
    list.innerHTML = ""

}

function edit(a){
  var x = ( a.parentNode.childNodes[0].nodeValue )
var editValue = prompt("update your value", x)
var editTodo = {
    value : editValue,
    key : a.id
}
firebase.database().ref('todos').child(a.id).set(editTodo)
a.parentNode.childNodes[0].nodeValue = editValue
}