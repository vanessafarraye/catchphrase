$(function () {

Phrase.all();
View.init();

});

function View() {};

View.render = function(items, parentId, templateId) {
	var template = _.template($("#" + templateId).html());
  	$("#" + parentId).html(template({phrases: items}));
  	//console.log("template", (template({phrases: items})));
};

View.init = function () {
	$("#new-word-form").on("submit", function(event){
		event.preventDefault();
		var phrasesParams = $(this).serialize()
		Phrase.create(phrasesParams); 

	});
};

function Phrase(){};

Phrase.create = function(phrasesParams) {
	$.post("/phrases", phrasesParams).done(function(res){
		Phrase.all();
	}).done(function(res){
		$("#new-word-form")[0].reset();
	});
}

Phrase.all = function() {
	$.get("/phrases", function(res) {
		//console.log("res", res);
		var phrases = JSON.parse(res);
		View.render(phrases, "phrases-ul", "phrases-template");
	});
};

Phrase.delete = function(phrase) {
	//console.log("phrase", phrase);
		var phraseId = $(phrase).data().id;
		$.ajax({
			url: '/phrases/' + phraseId,
			type: 'DELETE',
			success: function(res) {
				console.log("deteled successfuly")
				Phrase.all();
			}
		});	
	
};