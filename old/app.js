const http = require('http');

const url = require('url')
const querystring = require('querystring');

require('./model/index.js');
const User = require('./model/user.js');

/* User.create({
	name: 'ew',
	age: 66,
	password: "qwer45we",
	email: "54fg54@123yuicom",
	hobbies: ['hfdgfdgds','ufgi']
}).then(result => console.log(result)); */
const app = http.createServer();

app.on('request', async (req, res) => {
	//请求方式 
	const method = req.method.toUpperCase();
	//请求地址
	const {
		pathname,
		query
	} = url.parse(req.url,true);
	if (method == 'GET') {
		//呈现用户列表页面
		if (pathname == '/list') {
			let users = await User.find();
			let list =
				`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	</head>
	<body>
		<div class="container">
			<h6>
				<a href="add" class="btn btn-success">添加用户</a>
			</h6>
			<table class="table table-striped">
			  <tr>
				  <td>用户名</td>
				  <td>年龄</td>
				  <td>爱好</td>
				  <td>邮箱</td>
				  <td>操作</td>
			  </tr>`;
			users.forEach((item, index, arr) => {
				list += `
				  <tr>
					  <td>${item.name}</td>
					  <td>${item.age}</td>
					  <td>`
				item.hobbies.forEach(it => {
					list += `<span class="btn btn-default">${it}</span>`
				})

				list +=
					`</td>
					  <td>item.email</td>
					  <td>
						  <a href="/remove?id=${item._id}" class="btn btn-danger">删除</a>
						  <a href="/modify?id=${item._id}" class="btn btn-success">修改</a>
					  </td>
				  </tr>
				  `
			})
			list += `</table> 
					</div>
				</body>
			</html>`;
			res.end(list);
		} 
		else if (pathname == '/add') {
			let add =
				`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	</head>
	<body>
		<div class="container">
			<h1>添加用户</h1>
			<form method="post" action="/add">
				<h3>用户名</h3>
				<input type="text" class="form-control" placeholder="Text input" name="name">
				<h3>密码</h3>
				<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password">
				<h3>年龄</h3>
				<input type="text" class="form-control" placeholder="Text input" name="age">
				<h3>邮箱</h3>
				<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" name="email">
				<h3>请选择爱好：</h3>
				<label class="checkbox-inline">
				  <input  name="hobbies" type="checkbox" id="inlineCheckbox1" value="足球"> 足球
				</label>
				<label class="checkbox-inline">
				  <input  name="hobbies" type="checkbox" id="inlineCheckbox2" value="篮球"> 篮球
				</label>
				<label class="checkbox-inline">
				  <input  name="hobbies" type="checkbox" id="inlineCheckbox3" value="橄榄球"> 橄榄球
				</label>
				<label class="checkbox-inline">
				  <input  name="hobbies" type="checkbox" id="inlineCheckbox3" value="乒乓球"> 乒乓球
				</label>
				<label class="checkbox-inline">
				  <input  name="hobbies" type="checkbox" id="inlineCheckbox3" value="抽烟"> 抽烟
				</label>
				<label class="checkbox-inline">
				  <input  name="hobbies" type="checkbox" id="inlineCheckbox3" value="喝酒"> 喝酒
				</label>
				<br>
				<br>
				<button type="submit" class="btn btn-primary">添加用户</button>
			</form>
		</div>
	</body>
</html>
`
			res.end(add);
		}
		else if (pathname == '/modify') {
			let user = await User.findOne({_id: query.id});
			let hobbiesArray = ['足球', '篮球', '橄榄球' ,'乒乓球', '抽烟' ,'喝酒']
			let modify = `<!DOCTYPE html>
			<html>
				<head>
					<meta charset="utf-8">
					<title></title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
				</head>
				<body>
					<div class="container">
						<h1>修改用户</h1>
						<form method="post" action="/modify?id=${user._id}">
							<h3>用户名</h3>
							<input value="${user.name}" type="text" class="form-control" placeholder="Text input" name="name">
							<h3>密码</h3>
							<input value="${user.password}" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password">
							<h3>年龄</h3>
							<input value="${user.age}" type="text" class="form-control" placeholder="Text input" name="age">
							<h3>邮箱</h3>
							<input value="${user.email}"type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" name="email">
							<h3>请选择爱好：</h3>`
							hobbiesArray.forEach(item => {
								if(user.hobbies.includes(item)) {
									modify += `
									<label class="checkbox-inline">
									  <input checked name="hobbies" type="checkbox" id="inlineCheckbox1" value="${item}"> ${item} 
									</label>
									`
								} else {
									modify += `<label class="checkbox-inline">
									  <input  name="hobbies" type="checkbox" id="inlineCheckbox1" value="${item}"> ${item} 
									</label>`
								}
							})
							modify +=`<br>
							<br>
							<button type="submit" class="btn btn-primary">修改用户</button>
						</form>
					</div>
				</body>
			</html>
			`;
			res.end(modify);
		}
		else if (pathname == '/remove') {
			await User.findOneAndDelete({_id:query.id});
			res.writeHead(301, {
				Location: '/list'
			});
			res.end();
		}
	} 
	else if (method == 'POST') {
		if (pathname == '/add') {
			let formData = '';
			req.on('data', param => {
				formData += param;
			})
			req.on('end', async () => {
				let user = querystring.parse(formData);
				await User.create(user);
				//301重定向
				res.writeHead(301, {
					location: '/list'
				})
				res.end();
			})
		} 
		else if(pathname == '/modify') {
			let formData = '';
			req.on('data', param => {
				formData += param;
			})
			req.on('end', async () => {
				let user = querystring.parse(formData);
				await User.updateOne({_id: query.id},user);
				//301重定向
				res.writeHead(301, {
					location: '/list'
				})
				res.end();
			})
		}
	}
})
app.listen(3000, () => {
	console.log('3000端口已启动')
})

/*
问题：分离

*/