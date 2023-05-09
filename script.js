/* ******* Menu ******** */

// Funciones anónimas auto ejecutables
// Las variables del DOM se reomienda antecederlas del signo dolar $
((d) =>{
    const $btnMenu = d.querySelector('.menu-btn');
    const $menu = d.querySelector('.menu');

    $btnMenu.addEventListener('click', (e)  => {
        $btnMenu.firstElementChild.classList.toggle('none');
        $btnMenu.lastElementChild.classList.toggle('none');
        $menu.classList.toggle('is-active');
    })

    // Delegación de eventos
    d.addEventListener('click', (e) => {
        // Elije a cualquier elemento a que sea hijo de .menu
        if(!e.target.matches('.menu a')) return false;

        $btnMenu.firstElementChild.classList.remove('none');
        $btnMenu.lastElementChild.classList.add('none');
        $menu.classList.remove('is-active');        
    })


    // Envío formulario usando form submit
    // CONTACT FORM

    const $form = d.querySelector('.contact-form');
    const $loader = d.querySelector('.form-loader');
    const $response = d.querySelector('.contact-form-response');

    $form.addEventListener('submit', (e) => {
        e.preventDefault();
        $loader.classList.remove('none');

        fetch('https://formsubmit.co/ajax/mauricio.desarrollador@gmail.com', {
            method: 'POST',
            body: new FormData(e.target)
        }).then((res) => (res.ok? res.json(): Promise.reject(res)))
        .then(json => {
            console.log(json);
            location.hash = '#thanks';
            $form.reset()
        })
        .catch(err => {
            console.log(err)
            let message = err.statusText || 'Ocurrio un error al enviar el mensaje. Intente nuevamente'
            $response.querySelector('h3').innerHTML = `Error ${err.status}: ${message}`;    
        })
        .finally(() => {
            $loader.classList.add('none');

            setTimeout(() => {
                location.hash = '#close';
            }, 3000)
        })
    })

    const now = new Date()
    const date = d.querySelector('.date')
    date.textContent = now.getFullYear()

})(document)

