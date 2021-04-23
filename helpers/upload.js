var multer = require('multer');
var baseDir = process.cwd();
var upload = multer({
	dest: baseDir + "/uploads/"
});
var fs = require('fs');
//const Sequelize = require('sequelize'); // seqelize lib

var uploadPathw = baseDir + "/uploads/";
var imgExt = {
	'image/png': '.png',
	'image/jpeg': '.jpeg',
	'image/jpg': '.jpg',
	'text/csv': '.csv',
};
var Promise = require('promise');
module.exports = function () {
	async function uploadFile(req, res, uploadFolder) {
		return new Promise(function (resolve, reject) {
			var tmp_path = req.file.path;
			var uploadPath = uploadPathw + uploadFolder;
			console.log(uploadPath);

			if (!fs.existsSync(uploadPath)) {
				fs.mkdirSync(uploadPath);
			}
			if (imgExt[req.file.mimetype] !== undefined) {
				//var fileName = req.file.filename + imgExt[req.file.mimetype];
				var fileName = req.file.filename;
				var target_path = uploadPath + '/' + fileName;
				/** A better way to copy the uploaded file. **/
				var src = fs.createReadStream(tmp_path);
				var dest = fs.createWriteStream(target_path);
				unlinkFile(tmp_path);
				src.pipe(dest);
				src.on('end', function () {
					resolve({
						status: 200,
						response: 'Uploaded Successfully!',
						name: fileName
					});
				});
				src.on('error', function (err) {
					reject({
						status: 501,
						response: err
					});
				});
			} else {
				reject({
					status: 501,
					response: 'This file is not allowed'
				});
			}
		});
	}

	function unlinkFile(url) {
		return new Promise(function (resolve, reject) {
			fs.unlink(url, (err) => {
				if (err) {
					reject({
						status: 501,
						response: err
					});
				} else {
					resolve({
						status: 200,
						response: 'deleted'
					});
				}
			});
		});
	}

	function csvUpload(req, res, uploadFolder) {
		return new Promise(function (resolve, reject) {
			var tmp_path = req.file.path;
			var uploadPath = uploadPathw + uploadFolder;
			if (!fs.existsSync(uploadPath)) {
				fs.mkdirSync(uploadPath);
			}
			let fileName = req.file.filename + imgExt[req.file.mimetype];
			var target_path = uploadPath + '/' + fileName;
			/** A better way to copy the uploaded file. **/
			var src = fs.createReadStream(tmp_path);
			var dest = fs.createWriteStream(target_path);
			unlinkFile(tmp_path);
			src.pipe(dest);
			src.on('end', function () {
				resolve({
					status: 200,
					response: 'Uploaded Successfully!',
					name: fileName
				});
			});
			src.on('error', function (err) {
				reject({
					status: 501,
					response: err
				});
			});
		});
	}
	// Common funtion to save the log of user
	function saveActivity(req, logout = false, json_log_fields = false, json_data_fields = false, UserID = false, Username = false) {
		saveObj = {
			'date_of_login': new Date(),
			'date_of_logout': new Date(),
			'json_log_fields': json_log_fields,
			'json_data_fields': json_data_fields,
			'user_id': UserID,
			'name': Username,
		}
		dbObj.saveUser('Activity', false, saveObj).then(function (result) {
			console.log(result);
		});
	}

	/***************************************\
	| @Who : Gurpreet 						|
	| @Function name : Give all permission to superadmin  			|
	| @why : permission set for superadmin			|
	| @when : 11-02-2019					|
	\***************************************/

	function giveAllPermision(UserID = false) {
		var options = {
			attributes: ['id'],
			raw: false,
		};
		Permissions.findAll(options)
			.then(userResponse => {
				let cond = {
					user_id: UserID
				};
				dbObj.deleteUser('UserPermission', cond, '').then(function (result) { });
				userResponse.forEach(element => {
					saveObj = {
						permission_id: element.id,
						user_id: UserID,
						is_create: 'true',
						is_edit: 'true',
						is_delete: 'true',
						is_list: 'true',
					};
					dbObj.saveUser('UserPermission', false, saveObj).then(function (result) { });
				});
			})
			.catch(error => { })
	}


	/***************************************\
	| @Who : Gurpreet 						|
	| @Function name : Check user have permission or not	|
	| @why : check user has permission or not the modules 	|
	| @when : 11-02-2019					|
	\***************************************/

	function giveAllPermision(UserID = false) {
		var options = {
			attributes: ['id'],
			raw: false,
		};
		Permissions.findAll(options)
			.then(userResponse => {
				let cond = {
					user_id: UserID
				};
				dbObj.deleteUser('UserPermission', cond, '').then(function (result) { });
				userResponse.forEach(element => {
					saveObj = {
						permission_id: element.id,
						user_id: UserID,
						is_create: 'true',
						is_edit: 'true',
						is_delete: 'true',
						is_list: 'true',
					};
					dbObj.saveUser('UserPermission', false, saveObj).then(function (result) { });
				});
			})
			.catch(error => { })
	}


	return {
		uploadFile: uploadFile,
		unlinkFile: unlinkFile,
		csvUpload: csvUpload,
		saveActivity: saveActivity,
		giveAllPermision: giveAllPermision
	};
}
