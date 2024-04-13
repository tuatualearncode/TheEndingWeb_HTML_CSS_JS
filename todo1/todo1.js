let email = document.querySelector('#email-input')
let password = document.querySelector('#password-input')
let errorE = document.querySelector('.error-email')
let errorP = document.querySelector('.error-password')
let form = document.querySelector('#login-form-input')

form.addEventListener('submit', function(event)
    {
        // form bắt sự kiện submit
    event.preventDefault()
    console.log('submit')
    console.log('submit')
    console.log(email.value)
    console.log(password.value)
        if (email.value !== '' && password.value !== '') 
        {
            login()
        }
    })
    function login() {
        return new Promise(function(resolve, reject) {
            fetch('https://recruitment-api.pyt1.stg.jmr.pl/login', 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: email.value,
                    password: password.value
                })
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Server response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                if (data.status === 'ok') {
                    window.location.href = 'todo_web2.html'
                } else {
                    errorE.style.color = "red";
                    errorP.style.color = "red";
                    errorE.innerHTML = data.message;
                    errorP.innerHTML = data.message;
                    alert(data.message);
                    reject(new Error('Login failed'));
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
                reject(error);
            });
        });
    }


// let email = document.querySelector('#email-input')
// let password = document.querySelector('#password-input')
// let errorE = document.querySelector('.error-email')
// let errorP = document.querySelector('.error-password')
// let form = document.querySelector('#login-form-input')

// form.addEventListener('submit', function(event) 
// { form bắt sự kiện submit
    // event.preventDefault()
    // console.log('submit')
    // console.log('submit')
    // console.log(email.value)
    // console.log(password.value)


// /* check value email */
//     if (email.value === '')
//     {
//         event.preventDefault()   // trình duyệt sẽ có hành vi mặc định thực hiện hành động mặc định là gửi
//                                  // dữ liệu từ form đến một URL được chỉ định trong thuộc tính action của thẻ <form> 
//                                  // và sau đó tải lại trang hoặc chuyển hướng đến URL đó, khi dùng  event.preventDefault()
//                                  //  nghĩa là không gửi dữ liệu form và không tải lại trang.
//         errorE.style.color = "red"
//         errorE.innerHTML = 'Email is required'
//     } 
//     else 
//     {
//         errorE.innerHTML = ''
//         errorE.style.color = ''
//     }
// /* check value password */
//     if (password.value === '') 
//     {
//         event.preventDefault()
//         errorP.style.color = "red"
//         errorP.innerHTML = 'Password is required'
//     } 
//     else 
//     {
//         errorP.innerHTML = ''
//         errorP.style.color = ''
//     }

// /* nếu đã điền vào email-input và password-input thì chuyển đến thực hiện hàm login() */
//     if (email.value !== '' && password.value !== '') 
//     {
//         login()
//     }
// })

// async function login() { // login() = promise
//     try {
//         let response = await fetch('https://recruitment-api.pyt1.stg.jmr.pl/login',
//         {
//             method: 'POST',
//             headers: 
//             {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 login: email.value,
//                 password: password.value
//             })
//         })

//         if (response.ok)  //Kiểm tra xem response từ API có thành công không bằng cách sử dụng response.ok.
//         {
//             let data = await response.json()
//             console.log('data', data)

//             if (data.status === 'ok') 
//             {
//                 window.location.href = "todo2.html"
//             } 
//             else 
//             {
//                 errorE.style.color = "red"
//                 errorP.style.color = "red"
//                 errorE.innerHTML = data.message
//                 errorP.innerHTML = data.message
//                 alert(data.message)
//             }
//         } 
//         else 
//         {
//             console.error('Server response was not ok')
//         }
//     }
//      catch (error) 
//     {
//         console.error('Error:', error)
//     }
// }