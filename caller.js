
let sumbit = document.getElementById('submit')
let ul =document.getElementById('callerDetailes');
sumbit.addEventListener('click',showOnScreen)



window.addEventListener('DOMContentLoaded',fromLocal);

function fromLocal (){
    for(let i=0;i<localStorage.length;i++){
    
        let data = localStorage.getItem(localStorage.key(i))
        if(JSON.parse(data).valid){
            createLi(JSON.parse(data))
        }else{
            localStorage.removeItem(JSON.parse(data).number)
        }
        
        
    }
    
}

function showOnScreen(){
        let ph_number = document.getElementById('number').value;
        let code = document.getElementById('code').value
            axios.get(`https://api.apilayer.com/number_verification/validate?number=${code}${ph_number}`,{headers:
        {
            'apikey': 'asehdp5VXHMaBgGMu2GYnVxKiF1wA6hY',
        }}).then((resolve)=>{console.log(resolve.data)
            if(!resolve.data.valid){
                alert("Entered Number is in wrong format")
                let li1 =document.createElement('li');
                li1.className='list-group-item list-group-item-danger'
                let span =document.createElement('span');
                let text1 =document.createTextNode(`+${code}-${ph_number} Is Invalid Number`)
                span.appendChild(text1);
                li1.appendChild(span)
                ul.appendChild(li1)


            }else{
                createLi(resolve.data)
            }
            localStorage.setItem(resolve.data.number,JSON.stringify(resolve.data))
           
    })}

function createLi (data){
    let li1 =document.createElement('li');
    let li2 =document.createElement('li');
    let li3 =document.createElement('li');
    let li4 =document.createElement('li');
    let li5 =document.createElement('li');

    li1.className='list-group-item active'
    li2.className='list-group-item'
    li3.className='list-group-item'
    li4.className='list-group-item'
    li5.className='list-group-item'


    let span =document.createElement('span');
    let text1 =document.createTextNode(`Number : ${data.local_format}`)
    span.appendChild(text1);
    span.style.color='white'
    li1.appendChild(span)
    if(data.line_type!='landline'){
        let text2 =document.createTextNode(`Carrier : ${data.carrier}`)
        li2.appendChild(text2)
    }
    let text3 =document.createTextNode(`Country Name : ${data.country_name}`)
    li3.appendChild(text3)
    let text4 =document.createTextNode(`Line Type : ${data.line_type}`)
    li4.appendChild(text4)
    let text5 =document.createTextNode(`Location : ${data.location}`)
    li5.appendChild(text5)


    // let button =document.createElement('input');
    // button.type='button';
    // button.value ='VieMore';
    // button.className ='btn btn-outline-success btn-sm float-right'
    // button.onclick =()=>{
    //     console.log(data.group,data.title)
    // // }
    // li.appendChild(button)
    ul.appendChild(li1)
    ul.appendChild(li3)
    ul.appendChild(li5)
    if(data.line_type!='landline'){
        ul.appendChild(li2)
    }
    ul.appendChild(li4)

}
