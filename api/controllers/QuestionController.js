"use strict";

var JsonFile 			= require('jsonfile');
var SubjectController 	= require('./SubjectController');

(function(self) {

	var _create = function(question) {
		var QuestionFile = JsonFile.readFileSync('./files/Question.json');
		var Subject = {};
		question.validate();
		question.id = QuestionFile.length === 0 ? 1 : QuestionFile[QuestionFile.length - 1].id + 1;

		SubjectController.FindById(question.fkSubject);

		Subject = question.subject;
		delete question.subject;

		QuestionFile.push(question);

		JsonFile.writeFileSync('./files/Question.json', QuestionFile);

		question.subject = Subject;

		return question;
	};

	var _update = function(question, id) {
		var QuestionFile 	= JsonFile.readFileSync('./files/Question.json');
		var existsQuestion 	= self.FindById(id);
		question.validate();
		question.id = id;

		SubjectController.FindById(question.fkSubject);

		for (var i = 0; i < QuestionFile.length; ++i) {
			var objQuestion = QuestionFile[i];
			if (objQuestion.id === id) {
				objQuestion.updatedAt = new Date();
				objQuestion.fkSubject = question.fkSubject;
				objQuestion.description = question.description;
				objQuestion.answer = question.answer;

				JsonFile.writeFileSync('./files/Question.json', QuestionFile);
			}
		}

		return question;
	};

	var _delete = function(id) {
		var QuestionFile 	= JsonFile.readFileSync('./files/Question.json');
		var question 		= self.FindById(id);

		for (var i = 0; i < QuestionFile.length; ++i) {
			var objQuestion = QuestionFile[i];
			if (objQuestion.id === id) {
				objQuestion.deletedAt = new Date();

				JsonFile.writeFileSync('./files/Question.json', QuestionFile);
			}
		}

		return true;
	};

	var _findAll = function() {
		var QuestionFile 	  = JsonFile.readFileSync('./files/Question.json');
		var QuestionAvailable = [];

		for (var i = 0; i < QuestionFile.length; ++i) {
			var objQuestion = QuestionFile[i];
			if (objQuestion.deletedAt === null) {
				objQuestion.subject = SubjectController.FindById(objQuestion.fkSubject);
				QuestionAvailable.push(objQuestion);
			}
		}

		return QuestionAvailable;
	};

	var _findById = function(id) {
		var QuestionFile = self.FindAll();
		for (var i = 0; i < QuestionFile.length; ++i) {
			var objQuestion = QuestionFile[i];
			objQuestion.subject = SubjectController.FindById(objQuestion.fkSubject);
			if (objQuestion.id === id) {
				return objQuestion;
			}
		}
		throw 'Question is not found!';
	};

	self.Create 	= _create;
	self.Update 	= _update;
	self.Delete 	= _delete;
	self.FindAll 	= _findAll;
	self.FindById 	= _findById;

})(this);