//验证用户登录
$(document).ready(function() {
	$('#loginForm').bootstrapValidator({
		message: '登录失败',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			//登录用户名验证
			loginname: {
				message: '用户名验证失败',
				validators: {
					notEmpty: {
						message: '用户名不能为空'
					}
				}
			},
			//登录密码验证
			loginpwd: {
				message: '密码验证失败',
				validators: {
					notEmpty: {
						message: '密码不能为空'
					}
				}
			}
		}
	});

	//验证注册用户信息
	$('#regForm').bootstrapValidator({
		message: '注册失败！',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			
			//验证用户名
			regname: {
				message: '用户名验证失败',
				validators: {
					notEmpty: {
						message: '用户名不能为空'
					},
					stringLength: {
						min: 6,
						max: 18,
						message: '用户名长度必须在6到18位之间'
					},
					 threshold :6 ,//输入6个字符才发送ajax请求
					
					remote:{//进行ajax验证
						type:'post',
						url:'http://172.168.1.103/register.php?name='+$('#regname').val(),
						message:'用户名已经存在！',
						delay:'2000',//2秒发送一个ajax请求（减轻服务器负担）
						success:function(a){
							
							//这里需要说明的是bootstrap的remote验证器需要的返回结果一定是json格式的数据 :
							console.log(a);
						}
					 },
					regexp: {
						regexp: /^[a-zA-Z0-9_]+$/,
						message: '用户名只能包含大写、小写、数字和下划线'
					}
				}
			},
			//验证邮箱
			regemail: {
				validators: {
					notEmpty: {
						message: '邮箱不能为空'
					},
					emailAddress: {
						message: '邮箱地址格式有误'
					}
				}
			},

			//验证用户密码
			regpwd: {
				validators: {
					notEmpty: {
						message: '密码不能为空'
					},
					stringLength: {
						min: 6,
						max: 12,
						message: '密码长度必须在6到12位之间'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_]+$/,
						message: '密码只能包含大写、小写、数字和下划线'
					},
					identical: {
						field: 'regrepwd',
						message: '两次密码输入不一致'
					}
				}
			},
			//确认密码
			regrepwd: {
				validators: {
					notEmpty: {
						message: '确认密码不能为空'
					},
					stringLength: {
						min: 6,
						max: 12,
						message: '确认密码长度必须在6到12位之间'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_]+$/,
						message: '确认密码只能包含大写、小写、数字和下划线'
					},
					identical: {
						field: 'regpwd',
						message: '两次密码输入不一致'
					}
				}
			}

		}
	});

});

//验证用户注册