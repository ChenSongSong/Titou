<!DOCTYPE html>
<!-- saved from url=(0033)https://titou.com/settings/admin -->
<html class="   ">
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


<body class="logged_in  env-production macintosh">
  <div class="wrapper">
      <!--顶部导航栏开始-->
      <div class="wide header navigator">
        <div class="container">
          <div class="ten columns s-nav-column">
            <div class="nav" style="margin-top: 12px;">
              <!--ul class="s-nav" style="font-family:inherit;">
                <span>
                  <li><a class="s-nav-item" href="./index.html">首页</a></li>
                  <li><a class="s-nav-item" href="./index.html">登陆/注册</a></li>
                  <li><a class="s-nav-item" href="./index.html">产品介绍</a></li>
                  <li><a class="s-nav-item" href="./index.html">用户帮助</a></li>
                  <li><a class="s-nav-item" href="./index.html">关于我们</a></li>
                </span></ul-->
            </div>
          </div>
        </div>
      </div>
      <!--顶部导航栏结束-->
  

    
      <div class="site clearfix">
        <div id="site-container" class="context-loader-container">
          <div class="container">
            <!--左边栏菜单开始-->
            <div class="settings-nav menu-container">
              <ul class="menu accordion">
                          <dt onClick='showHide("items1_1")'><b>我的店铺</b></dt>
                          <dd style='display:block' class='sitem' id='items1_1'>
                            <ul class="expanded section-nav sitemu">
                                <li>
                                  <a href="./info.jsp" class="js-selected-navigation-item ">店铺资料</a>
                                </li>
                                <li>
                                  <a href="./change-info.jsp" class="js-selected-navigation-item ">修改信息</a>
                                </li>
                                <li>
                                  <a href="./change-pwd.jsp" class="js-selected-navigation-item selected">修改密码</a>
                                </li>
                            </ul>
              </ul>
              <ul class="menu accordion">
                          <dt onClick='showHide("items2_1")'><b>管理页面</b></dt>
                          <dd style='display:block' class='sitem' id='items2_1'>
                            <ul >
                                <li>
                                  <a href="./manage.jsp" class="js-selected-navigation-item ">发型师管理</a>
                                </li>
                                <li>
                                  <a href="./vip.jsp" class="js-selected-navigation-item ">会员管理</a>
                                </li>
                                <li>
                                  <a href="./pay.jsp" class="js-selected-navigation-item ">收入管理</a>
                                </li>
                            </ul>
              </ul>
            </div>
            <!--左边栏菜单结束-->
        
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
          </div> <!-- container-->
        </div>  <!-- sitecontainer-->
      </div>  
  </div>  <!-- .wrapper -->

  <!--底部导航栏开始-->
  <div class="container foot">
    <div class="site-footer">
      <ul class="site-footer-links">
        <li>© 2014 <span >更美好科技</span>, Inc.</li>
          <li><a href="" target="_blank">更多帮助</a></li>
          <li><a href="" traget="_blank">加入我们</a></li>
          <li><a href="" target="_blank">关于我们</a></li>
      </ul>
    </div><!-- /.site-footer -->
  </div><!-- /.container -->
  <!--底部导航栏结束-->

</body></html>