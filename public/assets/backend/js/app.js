const formLogin = document.getElementById('formLogin');
const formUpdate = document.getElementById('formUpdate');
const formInsertar = document.getElementById('formInsertar');
const formEliminar = document.getElementById('formEliminar');
const formInsertar_objeto = document.getElementById('formInsertar_objeto');
const formUpdate_objeto = document.getElementById('formUpdate_objeto');
const formEliminar_objeto = document.getElementById('formEliminar_objeto');

if(formLogin)
{
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto
        
        // Obtener los datos del formulario
        const formData = new FormData(this);
       
        // Convertir FormData a un objeto simple para depuración
        const plainFormData = Object.fromEntries(formData.entries());
        console.log('Datos del formulario:', plainFormData);
    
        // Enviar los datos al servidor
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plainFormData) // Enviar los datos como JSON
        })
        .then(response => {
            if (response.redirected) {
                // Si la respuesta es una redirección, seguir la redirección
                window.location.href = response.url;
            } else if (response.ok) {
                return response.json(); // Si la respuesta es exitosa, convertir a JSON
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            if (data) { // Asegurarse de que data no sea null
                // Manejar la respuesta del servidor
                console.log('Respuesta del servidor:', data);
    
                // Mostrar mensaje de error, si existe
                if (data.message) {
                    document.getElementById('mensajeError').textContent = data.message;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error); // Capturar y manejar errores generales
            // Mostrar mensaje de error general en tu página HTML
            if (error.message) {
                document.getElementById('mensajeError').textContent = error.message;
            }
        });
    });
}

if(formInsertar)
    {
        formInsertar.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío del formulario por defecto
    
            // Obtener los datos del formulario
            const formData = new FormData(this);
           
            // Convertir FormData a un objeto simple para depuración
            const plainFormData = Object.fromEntries(formData.entries());
            console.log('Datos del formulario:', plainFormData);
            // Enviar los datos al servidor
            fetch('/sitio-admin//modulo-ingresar-clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plainFormData) // Enviar los datos como JSON
            })
            .then(response => {
                if (response.redirected) {
                    // Si la respuesta es una redirección, seguir la redirección
                    window.location.href = response.url;
                } else if (response.ok) {
                    return response.json(); // Si la respuesta es exitosa, convertir a JSON
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
            })
            .then(data => {
                if (data) { // Asegurarse de que data no sea null
                    // Manejar la respuesta del servidor
                    console.log('Respuesta del servidor:', data);
        
                    // Mostrar mensaje de error, si existe
                    if (data.message) {
                        document.getElementById('mensajeError').textContent = data.message;
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error); // Capturar y manejar errores generales
                // Mostrar mensaje de error general en tu página HTML
                if (error.message) {
                    document.getElementById('mensajeError').textContent = error.message;
                }
            });
        });
    }

    if(formUpdate)
        {
            formUpdate.addEventListener('submit', function(event) {
                event.preventDefault(); // Evitar el envío del formulario por defecto
        
                // Obtener los datos del formulario
                const formData = new FormData(this);
               
                // Convertir FormData a un objeto simple para depuración
                const plainFormData = Object.fromEntries(formData.entries());
                console.log('Datos del formulario:', plainFormData);
                // Enviar los datos al servidor
                fetch('/sitio-admin/modulo-editar-cliente', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(plainFormData) // Enviar los datos como JSON
                })
                .then(response => {
                    if (response.redirected) {
                        // Si la respuesta es una redirección, seguir la redirección
                        window.location.href = response.url;
                    } else if (response.ok) {
                        return response.json(); // Si la respuesta es exitosa, convertir a JSON
                    } else {
                        return response.json().then(data => {
                            throw new Error(data.message);
                        });
                    }
                })
                .then(data => {
                    if (data) { // Asegurarse de que data no sea null
                        // Manejar la respuesta del servidor
                        console.log('Respuesta del servidor:', data);
            
                        // Mostrar mensaje de error, si existe
                        if (data.message) {
                            document.getElementById('mensajeError').textContent = data.message;
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error); // Capturar y manejar errores generales
                    // Mostrar mensaje de error general en tu página HTML
                    if (error.message) {
                        document.getElementById('mensajeError').textContent = error.message;
                    }
                });
            });
        }

 if(formEliminar)
    {
        formUpdate.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío del formulario por defecto
            
            // Obtener los datos del formulario
            const formData = new FormData(this);
                   
            // Convertir FormData a un objeto simple para depuración
            const plainFormData = Object.fromEntries(formData.entries());
            console.log('Datos del formulario:', plainFormData);
            // Enviar los datos al servidor
                fetch('/sitio-admin/modulo-eliminar-cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plainFormData) // Enviar los datos como JSON
            })
            .then(response => {
                if (response.redirected) {
                    // Si la respuesta es una redirección, seguir la redirección
                    window.location.href = response.url;
                } else if (response.ok) {
                    return response.json(); // Si la respuesta es exitosa, convertir a JSON
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
            })
            .then(data => {
                if (data) { // Asegurarse de que data no sea null
                    // Manejar la respuesta del servidor
                    console.log('Respuesta del servidor:', data);
                
                     // Mostrar mensaje de error, si existe
                    if (data.message) {
                        document.getElementById('mensajeError').textContent = data.message;
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error); // Capturar y manejar errores generales
                // Mostrar mensaje de error general en tu página HTML
                if (error.message) {
                     document.getElementById('mensajeError').textContent = error.message;
                }
            });
        });
    } 
if(formInsertar_objeto)
{
    formInsertar_objeto.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto
        
                // Obtener los datos del formulario
        const formData = new FormData(this);
               
                // Convertir FormData a un objeto simple para depuración
        const plainFormData = Object.fromEntries(formData.entries());
        console.log('Datos del formulario:', plainFormData);
                // Enviar los datos al servidor
        fetch('/sitio-admin//modulo-ingresar-objeto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plainFormData) // Enviar los datos como JSON
        })
        .then(response => {
            if (response.redirected) {
                        // Si la respuesta es una redirección, seguir la redirección
                window.location.href = response.url;
            } else if (response.ok) {
                return response.json(); // Si la respuesta es exitosa, convertir a JSON
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            if (data) { // Asegurarse de que data no sea null
                        // Manejar la respuesta del servidor
                console.log('Respuesta del servidor:', data);
            
                        // Mostrar mensaje de error, si existe
                if (data.message) {
                    document.getElementById('mensajeError').textContent = data.message;
                 }
            }
        })
        .catch(error => {
            console.error('Error:', error); // Capturar y manejar errores generales
                    // Mostrar mensaje de error general en tu página HTML
            if (error.message) {
                document.getElementById('mensajeError').textContent = error.message;
            }
        });
    });
}
    
if(formUpdate_objeto)
{
    formUpdate_objeto.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto
            
                    // Obtener los datos del formulario
        const formData = new FormData(this);
                   
                    // Convertir FormData a un objeto simple para depuración
           const plainFormData = Object.fromEntries(formData.entries());
           console.log('Datos del formulario:', plainFormData);
                  // Enviar los datos al servidor
          fetch('/sitio-admin/modulo-editar-objeto', {
            method: 'POST',
               headers: {
                 'Content-Type': 'application/json'
                },
            body: JSON.stringify(plainFormData) // Enviar los datos como JSON
          })
          .then(response => {
             if (response.redirected) {
                        // Si la respuesta es una redirección, seguir la redirección
                window.location.href = response.url;
            } else if (response.ok) {                    
                 return response.json(); // Si la respuesta es exitosa, convertir a JSON
               } else {
                  return response.json().then(data => {
                      throw new Error(data.message);
                });
              }
          })
           .then(data => {
            if (data) { // Asegurarse de que data no sea null
                           // Manejar la respuesta del servidor
                   console.log('Respuesta del servidor:', data);
                
                            // Mostrar mensaje de error, si existe
                   if (data.message) {
                    document.getElementById('mensajeError').textContent = data.message;
                }
             }
          })
          .catch(error => {
             console.error('Error:', error); // Capturar y manejar errores generales
                        // Mostrar mensaje de error general en tu página HTML
            if (error.message) {
                document.getElementById('mensajeError').textContent = error.message;
                }
          });
      });
 }
    
 if(formEliminar_objeto) {
    formUpdate_objeto.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los datos del formulario
        const formData = new FormData(this);

        // Convertir FormData a un objeto simple para depuración
        const plainFormData = Object.fromEntries(formData.entries());
        console.log('Datos del formulario:', plainFormData);
        // Enviar los datos al servidor
        fetch('/sitio-admin/modulo-eliminar-objeto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plainFormData) // Enviar los datos como JSON
        })
        .then(response => {
            if (response.redirected) {
                // Si la respuesta es una redirección, seguir la redirección
                window.location.href = response.url;
            } else if (response.ok) {
                return response.json(); // Si la respuesta es exitosa, convertir a JSON
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            if (data) { // Asegurarse de que data no sea null
                // Manejar la respuesta del servidor
                console.log('Respuesta del servidor:', data);

                // Mostrar mensaje de error, si existe
                if (data.message) {
                    document.getElementById('mensajeError').textContent = data.message;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error); // Capturar y manejar errores generales
            // Mostrar mensaje de error general en tu página HTML
            if (error.message) {
                document.getElementById('mensajeError').textContent = error.message;
            }
        });
    });
}
