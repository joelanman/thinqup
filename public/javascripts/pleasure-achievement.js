$(function(){

	var $recordTemplate = $($('#record-template').html());

	$('#add-record-button').on('click', function(e){

		e.preventDefault();
		$('#add-record-form').toggleClass('hidden', false);
		$('#add-record').toggleClass('hidden', true);

	});

	$('#add-record-done').on('click', function(e){

		e.preventDefault();

		var $record = $recordTemplate.clone();

		var description = $('#add-record-description').val();
		var pleasure = $('#add-record-pleasure').val();
		var achievement = $('#add-record-achievement').val();

		$('#add-record-description').val('');
		$('#add-record-pleasure').val('');
		$('#add-record-achievement').val('');

		var timeArray = new Date().toTimeString().split(":");

		$record.find('.time').text(timeArray[0] + ":" + timeArray[1]);
		$record.find('.description .value').text(description);
		$record.find('.pleasure .value').text(pleasure);
		$record.find('.achievement .value').text(achievement);

		$record.prependTo('#records');

		$('#add-record-form').toggleClass('hidden', true);
		$('#add-record').toggleClass('hidden', false);

	});

});