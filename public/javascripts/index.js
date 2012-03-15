(function(){

    window.onload = function (){

        var iframe = document.getElementById( 'j-encode-result-iframe' );
        var encodeTextarea = document.getElementById( 'j-encode-result' )

        iframe.addEventListener( 'load', function (){

            var base64String = this.contentWindow.document.body.innerHTML;
            encodeTextarea.value = base64String;
        });
    }
})();