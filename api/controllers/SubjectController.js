"use strict";

var JsonFile 			= require('jsonfile');

(function(self) {

	var _create = function(subject) {
		var SubjectFile = JsonFile.readFileSync('./files/Subject.json');
		subject.validate();
		subject.id = SubjectFile.length === 0 ? 1 : SubjectFile[SubjectFile.length - 1].id + 1;

		SubjectFile.push(subject);

		JsonFile.writeFileSync('./files/Subject.json', SubjectFile);

		return subject;
	};

	var _update = function(subject, id) {
		var SubjectFile 	= JsonFile.readFileSync('./files/Subject.json');
		var existsSubject 	= self.FindById(id);
		subject.validate();
		subject.id = id;

		for (var i = 0; i < SubjectFile.length; ++i) {
			var objSubject = SubjectFile[i];
			if (objSubject.id === id) {
				objSubject.updatedAt = new Date();
				objSubject.name = subject.name;

				JsonFile.writeFileSync('./files/Subject.json', SubjectFile);
			}
		}

		return subject;
	};

	var _delete = function(id) {
		var SubjectFile 	= JsonFile.readFileSync('./files/Subject.json');
		var QuestionFile 	= JsonFile.readFileSync('./files/Question.json');
		var subject 		= self.FindById(id);

		for (var i = 0; i < QuestionFile.length; ++i) {
			var objQuestion = QuestionFile[i];
			if (objQuestion.deletedAt === null && objQuestion.fkSubject === id) {
				throw 'Can\'t Remove Because There Are Relationships!';
			}
		}

		for (var i = 0; i < SubjectFile.length; ++i) {
			var objSubject = SubjectFile[i];
			if (objSubject.id === id) {
				objSubject.deletedAt = new Date();

				JsonFile.writeFileSync('./files/Subject.json', SubjectFile);
			}
		}

		return true;
	};

	var _findAll = function() {
		var SubjectFile = JsonFile.readFileSync('./files/Subject.json');
		var SubjectAvailable = [];

		for (var i = 0; i < SubjectFile.length; ++i) {
			var objSubject = SubjectFile[i];
			if (objSubject.deletedAt === null) {
				SubjectAvailable.push(objSubject);
			}
		}

		return SubjectAvailable;
	};

	var _findById = function(id) {
		var SubjectFile = self.FindAll();
		for (var i = 0; i < SubjectFile.length; ++i) {
			var objSubject = SubjectFile[i];
			if (objSubject.id === id) {
				return objSubject;
			}
		}
		throw 'Subject is not found!';
	};

	self.Create 	= _create;
	self.Update 	= _update;
	self.Delete 	= _delete;
	self.FindAll 	= _findAll;
	self.FindById 	= _findById;

})(this);