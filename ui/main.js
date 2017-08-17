console.log('Loaded!');

function onBtnCounter()
{
    alert('onBtnCounter');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        alert('DONE');
        console.log('on ready staus chnage');
        if ( request.readyState === XMLHttpRequest.DONE ) {
            if ( request.status === 200) {
                    alert('200');
                    console.log('trying to set counter value');
                    var count = request.responseText;
                    alert(count.toString());
                    document.getElementById('counter').innerText = count.toString();                    
            }
        }
    };
    request.open('GET', 'http://variganjisuresh.imad.hasura-app.io/counter', true);
    request.send(null);   
}

function myClick()
{
    alert('Testting button click');
}

function onUserClick()
{
    alert('onUserClick');
    ipUser.clear();
}

function onPwdClick()
{
    alert('onPwdClick');
    ipPwd.clear();
} 
