$(function(){

	var records = (localStorage.records) ? JSON.parse(localStorage.records) || [];

	var $recordTemplate = $($('#record-template').html());

	function drawRecord(record){
		var $record = $recordTemplate.clone();

		record.time = new Date(record.time);
		
		var timeArray = record.time.toTimeString().split(":");
		$record.find('.time').text(timeArray[0] + ":" + timeArray[1]);
		$record.find('.description .value').text(record.description);
		$record.find('.pleasure .value').text(record.pleasure);
		$record.find('.achievement .value').text(record.achievement);

		$record.prependTo('#records');
	}

	// draw records from localStorage

	for (var i=0; i<records.length; i++){

		drawRecord(records[i]);

	}

	$('#add-record-button').on('click', function(e){

		e.preventDefault();
		$('#add-record-form').toggleClass('hidden', false);
		$('#add-record').toggleClass('hidden', true);

	});

	$('#add-record-done').on('click', function(e){

		e.preventDefault();


		var description = $('#add-record-description').val();
		var pleasure = $('#add-record-pleasure').val();
		var achievement = $('#add-record-achievement').val();

		$('#add-record-description').val('');
		$('#add-record-pleasure').val('');
		$('#add-record-achievement').val('');

		var date = new Date();

		var record = {
			'time': date,
			'description': description,
			'pleasure': pleasure,
			'achievement': achievement
		};

		records.push(record);

		drawRecord(record);

		$('#add-record-form').toggleClass('hidden', true);
		$('#add-record').toggleClass('hidden', false);

		console.log(JSON.stringify(records));

		localStorage['records'] = JSON.stringify(records);

	});

});