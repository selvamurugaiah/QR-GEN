
const textEle = document.querySelector('#data');
const sizeEle = document.querySelector('#size');
const logoEle = document.querySelector('#logo');
const clearEle = document.querySelector('#clear');
const marginEle = document.querySelector('#margin');
const dotModeEle = document.querySelector('#dot');
const dotColorEle1 = document.querySelector('#dot-color-1');
const dotColorEle2 = document.querySelector('#dot-color-2');
const bgEle = document.querySelector('#bg-color');
const dlEle = document.querySelector('#btn-dl');


const op = {
    width: 100,
    height: 100,
    type: "png",
    data: textEle.value,
    image: "https://th.bing.com/th/id/OIP.n7-cqooa9O_IMtn8ZkHYBAHaHA?w=206&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    dotsOptions: {
        color: "#4267b2",
        type: "rounded",
        gradient: {
         "type":"linear",
         "colorStops":[
            {
                "offset":0,
                "color":"#000000"
            },
            {
                "offset":1,
                "color":"#000"
            }
         ]
        }
    },
    
backgroundOptions:{
        color:"#fff"
    }
};





sizeEle.addEventListener('input', e=>{
    op.width = e.target.value*10;
    op.height = e.target.value *10;
    render()
});

textEle.addEventListener('keyup' , e=>{
    op.data = e.target.value;
    render();
})

marginEle.addEventListener('input', e=>{
    op.imageOptions = {margin:e.target.value};
    render();
})

dotModeEle.addEventListener('change',e=>{
    op.dotsOptions.type = e.target.value;
    render();
})

dotColorEle1.addEventListener('input',e=>{
    op.dotsOptions.gradient.colorStops[0].color = e.target.value;
    render();
})

dotColorEle2.addEventListener('input',e=>{
    op.dotsOptions.gradient.colorStops[1].color = e.target.value;
    render();
})

bgEle.addEventListener('input', e=>{
    op.backgroundOptions.color = e.target.value;
    render()
})

function browse(){
    logoEle.click();
}

logoEle.addEventListener('change', e=>{
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload =()=>{
        op.image = reader.result;
        render();
    };
    reader.readAsDataURL(file);
})

clearEle.addEventListener('click', e=>{
    delete op.image;
    render()
})

dlEle.addEventListener('click', e=>{
    qrCode.download({name:'qr',extension:'svg'})
})

var qrCode;
function render(){
    qrCode = new QRCodeStyling(op);
    let canvasEl = document.querySelector('#canvas');
    canvasEl.innerHTML ='';
    qrCode.append(canvasEl)
    canvasEl.nextElementSibling.innerHTML = `${op.width}px * ${op.height}px`;
}


