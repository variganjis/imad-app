console.log('Loaded!');

function onBtnCounter()
{
    var request = new XMLHttpRequest();
    request.onreadystatuschange = function()
    {
        console.log('on ready staus chnage');
        if ( readystatus === XMLHttpRequest.DONE )
            {
                if ( request.status === 200)
                    {
                        console.log('trying to set counter value');
                        var count = request.responseText;
                        document.getElementById('counter').innerText = count.toString();                    
                    }
            }
    }
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
