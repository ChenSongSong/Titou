<!DOCTYPE html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<title>登陆</title>

<link href="./login/login1.css" media="screen" rel="stylesheet" type="text/css">
<link href="./login/login3.css" media="screen" rel="stylesheet" type="text/css">
</head>

<body class="new locale-en" id="sessions">

  <div class="sections">
    <div class="dark hh lazy section">
      <div class="fade hh inner lazy">
        <div class="container login-container">
          <div class="sixteen columns center">
            <div class="form sign-in-form">
              <form accept-charset="UTF-8" action="./login/sign-in.html" class="new_user" id="new_user" method="post">
                <div class="field">
                  <div class="label" ><label for="user_phone"></label></div>
                  <div class="input">
                    <input id="user_phone" name="user[phone]" size="30" type="text" placeholder="用户名/手机号码"></div>
                </div>
                <div class="field">
                  <div class="label"><label for="user_password"></label></div>
                  <div class="input">
                    <input id="user_password" name="user[password]" size="30" type="password" placeholder="密码"></div>
                </div>
                <div class="submit center">
                  <input class="submit" name="commit" type="submit" ></div>
              </form>
              <div class="center field">
                <br>
                <div class="field">
                  <p class="center label-text">
                    <a href="./forgetpwd.html">忘记密码</a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href="" class="view-sign-up-button">没有账号？立即注册</a>
                  </p>
                </div>
                <br>
                <br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

</body>
</html>