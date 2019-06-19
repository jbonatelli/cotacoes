console.log('javascript no frontend')

const cotacoesForm = document.querySelector('form')
const mainMensage = document.querySelector('h3')

const price = document.querySelector('#price')
const price_open = document.querySelector('#price_open')
const day_high = document.querySelector('#day_high')
const day_low = document.querySelector('#day_low')

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'Aguarde...'

        price.innerHTML = ''
        price_open.innerHTML = ''
        day_high.innerHTML = ''
        day_low.innerHTML = ''

    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        console.log('Necessário informar o ativo')
        return
    }
    
    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                mainMensage.innerText = `Operação inválida` 
                price.innerHTML = `${data.error.message} | código ${data.error.code}`
            } else {
                mainMensage.innerText = data.symbol
                price.innerHTML = `Price R$: ${data.price}`
                price_open.innerHTML = `Price Open R$: ${data.price_open}`
                day_high.innerHTML = `Day High R$: ${data.day_high}`
                day_low.innerHTML = `Day Low R$: ${data.day_low}`
            }
        })
    })
})