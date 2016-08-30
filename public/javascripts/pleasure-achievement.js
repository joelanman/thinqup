$(function(){

	var currentlyEditing = null;

	var records = (localStorage.records) ? JSON.parse(localStorage.records) : [];

	var $recordTemplate = $($('#record-template').html());

	function changeRecord (time){

		var time = new Date(Number(time));

		var timeJSON = time.toJSON();

		for (var i=0; i<records.length; i++){

			if (records[i].time == timeJSON){

				currentlyEditing = timeJSON;

				var record = records[i];

				$('#add-record-description').val(record.description);
				$('#add-record-pleasure').val(record.pleasure);
				$('#add-record-achievement').val(record.achievement);

				$('#add-record-form').toggleClass('hidden', false);
				$('#add-record').toggleClass('hidden', true);

				break;

			}

		}

	}

	function drawRecord(record, id){

		if (id){

			// edit existing

			var $record = $('#record_' + id);

		} else {

			// new record

			var $record = $recordTemplate.clone();

			var time = new Date(record.time);

			$record.attr('id', 'record_'+time.getTime());

			var timeArray = time.toTimeString().split(":");
			$record.find('.time').text(timeArray[0] + ":" + timeArray[1]);

			$record.prependTo('#records');

		}

		$record.find('.description .value').text(record.description);
		$record.find('.pleasure .value').text(record.pleasure);
		$record.find('.achievement .value').text(record.achievement);

		$('#remove-all-records').removeClass('hidden');
	}

	if (records.length == 0){

		$('#add-record-form').toggleClass('hidden', false);
		$('#add-record').toggleClass('hidden', true);

	} else {

		$('#add-record-form').toggleClass('hidden', true);
		$('#add-record').toggleClass('hidden', false);
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

	$('#remove-all-records').on('click', function(e){

		e.preventDefault();

		if (confirm("Are you sure you want to remove all records?")){

			$('#records').empty();
			delete localStorage.records;
			$('#remove-all-records').toggleClass('hidden', true);
		}

	});

	$('#add-record-done').on('click', function(e){

		e.preventDefault();

		var description = $('#add-record-description').val();
		var pleasure = $('#add-record-pleasure').val();
		var achievement = $('#add-record-achievement').val();

		$('#add-record-description').val('');
		$('#add-record-pleasure').val('');
		$('#add-record-achievement').val('');

		var record = {
			'description': description,
			'pleasure': pleasure,
			'achievement': achievement
		};

		if (currentlyEditing == null){

			var date = new Date();

			record.time = date;

			records.push(record);

			drawRecord(record);

		} else {

			for (var i=0; i<records.length; i++){

				if (records[i].time == currentlyEditing){

					var date = new Date(currentlyEditing);

					record.time = currentlyEditing;

					records[i] = record;

					var id = date.getTime();

					drawRecord(record, id);

					break;

				}

			}

			currentlyEditing = null;

		}

		$('#add-record-form').toggleClass('hidden', true);
		$('#add-record').toggleClass('hidden', false);

		localStorage['records'] = JSON.stringify(records);

	});

	$('.change-record').on('click', function(e){
			var $record = $(this).closest('.record');
			changeRecord($record.attr('id').replace('record_',''));
	});

});
