<!DOCTYPE html>
<!-- saved from url=(0033)https://titou.com/settings/admin -->
<html class="   ">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <title>修改信息</title>
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
                                  <a href="./change-info.jsp" class="js-selected-navigation-item selected">修改信息</a>
                                </li>
                                <li>
                                  <a href="./change-pwd.jsp" class="js-selected-navigation-item">修改密码</a>
                                </li>
                            </ul>
              </ul>
              <ul class="menu accordion">
                          <dt onClick='showHide("items2_1")'><b>管理页面</b></dt>
                          <dd style='display:block' class='sitem' id='items2_1'>
                            <ul class="expanded section-nav sitemu">
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
              <!-- 信息模块开始 -->
              <div class="boxed-group">
                  <h3>修改信息</h3>
                  <div class="boxed-group-inner clearfix
                    js-uploadable-container js-upload-avatar-image is-default">

                    <form accept-charset="UTF-8" action="/users/wongzigii" class="columns" id="profile_7384288" method="post">
                      <div style="margin:0;padding:0;display:inline">
                      <input name="utf8" type="hidden" value="✓">
                      <input name="_method" type="hidden" value="put">
                      <input name="authenticity_token" type="hidden" value="9rnuw+4KyV5ZmTCEpYAWstHvHtGhNVNumCnTRDfBPojPnkDkwiUkbGfGMlFIDWwGPX4WuQHJ5a23ArlZyvr/ew==">
                      </div>

                      <div class="column two-thirds">

                        <dl class="form edit-profile-avatar">
                          <dt><label for="upload-profile-picture">头像</label></dt>
                          <dd class="avatar-upload-container clearfix">

                            <!--小头像-->
                            <img alt="Wongzigii" class="profile-avatar" data-user="7384288" height="70" src="小头像url" width="70">

                            <!--上传头像模块-->
                            <div class="avatar-upload">
                              <a href="#" class="button button-change-profile-picture">
                                <label for="upload-profile-picture" class="label-upload-profile-picture">
                                  上传
                                  <input id="upload-profile-picture" type="file" multiple="multiple" class="manual-file-chooser">
                                </label>
                              </a>
                              <!--上传状态-->
                              <div class="upload-state loading">
                                <span class="button disabled">
                                  <img alt="" height="16"  width="16"> Uploading...
                                </span>
                              </div>

                              <!--上传失败,发出警告-->
                              <div class="upload-state danger too-big">
                                Please upload a picture smaller than 1 MB.
                              </div>

                              <div class="upload-state danger bad-dimensions">
                                Please upload a picture smaller than 10,000x10,000.
                              </div>

                              <div class="upload-state danger bad-file">
                                Unfortunately, we only support PNG, GIF, or JPG pictures.
                              </div>

                              <div class="upload-state danger bad-browser">
                                This browser doesn't support uploading pictures.
                              </div>

                              <div class="upload-state danger failed-request">
                                Something went really wrong and we can't process that picture.
                              </div>

                            </div> <!-- 上传头像模块结束 -->
                          </dd>
                        </dl>

                        <!--基本信息-->
                        <dl class="form">
                          <dt><label >店铺名称</label></dt>
                          <dd><input class="long" id="user_profile_name" name="user[profile_name]" size="30" type="text" value="山东大学"></dd>
                        </dl>
                        <dl class="form">
                          <dt><label >联系方式</label></dt>
                          <dd><input class="long" id="user_profile_phone" name="user[profile_phone]" size="30" type="text" value="12345678910"></dd>
                        </dl>
                        <dl class="form">
                          <dt><label for="user_profile_location">详细地址</label></dt>
                          <dd><input class="long" id="user_profile_location" name="user[profile_location]" size="30" type="text" value="山东省威海市环翠区山东大学"></dd>
                        </dl>
                        <p><button type="submit" class="button primary">提交</button></p>
                      </div>
                    </form>
                  </div>
              </div> <!--信息模块结束-->
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