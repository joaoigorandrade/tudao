"use strict";

var JsonFile 			= require('jsonfile');
var SubjectController 	= require('./SubjectController');

(function(self) {

	var _create = function(test) {
		var TestFile = JsonFile.readFileSync('./files/Test.json');
		var Subject = {};
		test.validate();
		test.id = TestFile.length === 0 ? 1 : TestFile[TestFile.length - 1].id + 1;

		SubjectController.FindById(test.fkSubject);

		Subject = test.subject;
		delete test.subject;

		TestFile.push(test);

		JsonFile.writeFileSync('./files/Test.json', TestFile);

		test.subject = Subject;

		return test;
	};

	var _update = function(test, id) {
		var TestFile 	= JsonFile.readFileSync('./files/Test.json');
		var existsTest 	= self.FindById(id);
		test.validate();
		test.id = id;

		SubjectController.FindById(test.fkSubject);

		for (var i = 0; i < TestFile.length; ++i) {
			var objTest = TestFile[i];
			if (objTest.id === id) {
				objTest.updatedAt = new Date();
				objTest.fkSubject = test.fkSubject;
				objTest.description = test.description;
				objTest.answer = test.answer;

				JsonFile.writeFileSync('./files/Test.json', TestFile);
			}
		}

		return test;
	};

	var _delete = function(id) {
		var TestFile 	= JsonFile.readFileSync('./files/Test.json');
		var test 		= self.FindById(id);

		for (var i = 0; i < QuestionFile.length; ++i) {
			var objTest = QuestionFile[i];
			if (objTest.id === id) {
				objTest.deletedAt = new Date();

				JsonFile.writeFileSync('./files/Test.json', TestFile);
			}
		}

		return true;
	};

	var _findAll = function() {
		var TestFile 	  = JsonFile.readFileSync('./files/Test.json');
		var TestAvailable = [];

		for (var i = 0; i < TestFile.length; ++i) {
			var objTest = TestFile[i];
			if (objTest.deletedAt === null) {
				objTest.subject = SubjectController.FindById(objTest.fkSubject);
				TestAvailable.push(objTest);
			}
		}

		return TestAvailable;
	};

	var _findById = function(id) {
		var TestFile = self.FindAll();
		for (var i = 0; i < TestFile.length; ++i) {
			var objTest = TestFile[i];
			objTest.subject = SubjectController.FindById(objTest.fkSubject);
			if (objTest.id === id) {
				return objTest;
			}
		}
		throw 'Test is not found!';
	};

	var _findByFkSubject = function(fkSubject) {
		var TestFile 	  = self.FindAll();
		var TestAvailable = [];

		for (var i = 0; i < TestFile.length; ++i) {
			var objTest = TestFile[i];
			var dateTest = new Date(objTest.createdAt);
			if (objTest.fkSubject === fkSubject &&
				dateTest.toLocaleDateString() === new Date().toLocaleDateString()) {
				objTest.subject = SubjectController.FindById(objTest.fkSubject);
				TestAvailable.push(objTest);
			}
		}

		return TestAvailable;
	};

	self.Create 			= _create;
	self.Update 			= _update;
	self.Delete 			= _delete;
	self.FindAll 			= _findAll;
	self.FindById 			= _findById;
	self.FindByFkSubject 	= _findByFkSubject;

})(this);