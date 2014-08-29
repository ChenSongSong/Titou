
<!-- saved from url=(0033)https://titou.com/settings/admin -->
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <title>修改密码</title>
    <link href="./titou/account1.css" media="all" rel="stylesheet" type="text/css">
    <link href="./titou/account2.css" media="all" rel="stylesheet" type="text/css">
    <script language='javascript'>var curopenItem = '1';</script>
    <script language="javascript" type="text/javascript" src="./login/menu.js"></script>
</head>
<!--头部结束-->
<body>
            <!--中间内容模块开始-->      
            <div class="settings-content">
              <!-- 修改密码模块开始 -->
                <div class="boxed-group">
                    <h3>修改密码</h3>
                    <div class="boxed-group-inner">
                      <form accept-charset="UTF-8" action="https://titou.com/account" class="edit_user" id="change_password" method="post">
                        <dl class="form password-confirmation-form">
                          <dt><div class="field-with-errors"><label class="old_password">旧密码</label></div></dt>
                          <dd><input id="user_old_password" name="user[old_password]" required="true"  type="password"></dd>
                        </dl>
                        <dl class="form password-confirmation-form">
                          <dt><div class="field-with-errors"><label class="new_password">新密码</label></div></dt>
                          <dd><input  id="user_new_password" name="user[password]" required="true" tabindex="2" type="password"></dd>
                        </dl>
                        <dl class="form password-confirmation-form">
                          <dt><div class="field-with-errors"><label class="confirm_new_password">确认新密码</label></div></dt>
                          <dd><input id="user_confirm_new_password" name="user[password_confirmation]" required="true" tabindex="2" type="password"></dd>
                        </dl>
                        <p>
                          <button class="button primary" >提交</button>
                        </p>
                      </form>          
                    </div>
                </div> <!--修改密码模块结束-->
            </div> <!--中间内容模块结束-->  

</body></html>