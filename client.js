

const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');

const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector('.publicchat');
const livepublic = document.querySelector('.livepublic');

const username = document.getElementById('username');



form.addEventListener('submit', (e)=>{
e.preventDefault();
if(!messageinput.value == ''){
    const message = messageinput.value;
    appended(`you: ${message}`,'right');
    socket.emit('send', message)
    messageinput.value='';
}else{
   
}

})

const livepub = (message)=>{

    const publicelement = document.createElement('div');
    publicelement.innerHTML = message;
    publicelement.classList.add('pub');
   
    livepublic.append(publicelement)
}



const appended = (message,position)=>{

    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement)
   
}

const namee = prompt("enter your name");
socket.emit('new-user-joined', namee)
document.getElementById('username').innerHTML = `<img src="user.png" width="20px">&nbsp;${namee}`;
livepub(`<p class="joinedUsers defult"><img src="user.png" width="20px" >&nbsp;${namee} - (Me) </p>`);

socket.on('user-joined', name=>{
    livepub(`<p class="joinedUsers" id="${name}"><img src="user.png" width="20px" >&nbsp;${name} </p>`);
})
socket.on('receive', data=>{
     
    appended(`${data.name}:${data.message}`, 'left');
    
})


const remo = (name,namee)=>{


    let joins = document.getElementById(name);

    joins.remove();

}

socket.on('left', name=>{
    appended(`${name}: left the chat`, 'left');
    remo(name,namee);
    
})