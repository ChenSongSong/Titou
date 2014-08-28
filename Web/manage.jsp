
<html class="   ">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <title>发型师管理</title>
    <link href="./titou/account1.css" media="all" rel="stylesheet" type="text/css">
    <link href="./titou/account2.css" media="all" rel="stylesheet" type="text/css">
    <script language='javascript'>var curopenItem = '1';</script>
    <script language="javascript" type="text/javascript" src="./login/menu.js"></script>
</head>
<!--头部结束-->
<body>
<!--中间内容模块开始-->      
            <div class="settings-content">
                            <!-- 验证模块开始 -->
              <div class="boxed-group">
                  <h3>验证</h3>
                  <div class="boxed-group-inner">
                    <form action="action地址" class="tel" id="change_password" method="post">
                    <dl class="form tel-confirmation-form">
                      <dt style="
    margin-bottom: 0px;
"><div class="field-with-errors">
</div></dt>
                    <p>
                      <input id="tel" name="user[tel]" required="true" placeholder="手机号" type="tel">
                      <button type="submit" class="button primary" style="
    border-left-width: 0px;
    border-bottom-width: 0px;
    margin-top: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
">发送验证码</button></p>
                      
                      <p><input id="id-code" name="id-code" required="true" type="id-code" placeholder="验证码">

                      <button type="submit" class="button primary">确认</button></p>
                    </dl>
                    </form>
                  </div>
              </div>
              <!--验证模块结束-->
                
              <!--发型师管理模块开始-->
              <div class="boxed-group">
                  <h3>发型师管理</h3>
                  <div class="boxed-group-inner clearfix">
                    <form action="action地址" class="hairist_to_manage" id="" method="post">
                      <div class="hairist">
                        <input type="checkbox" name="hairist1" value="1">发型师1<br>
                      </div>
                      <div class="hairist">
                        <input type="checkbox" name="hairist2" value="2">发型师2<br> 
                      </div>
                      <div class="hairist"> 
                        <input type="checkbox" name="hairist3" value="3">发型师3 
                      </div>
                      <a href="删除路径" data-remote="" data-method="delete" class="button primary danger">
                      删除
                      </a>
                    </form>
                  </div>
              </div> <!--发型师管理模块结束-->
            </div> <!--中间内容模块结束-->
</body></html>