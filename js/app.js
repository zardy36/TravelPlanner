$(function(){
	
	var model = {
		init: function() {
            if (!localStorage.activityList) {
                localStorage.activityList = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.activityList);
            data.push(obj);
            localStorage.activityList = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.activityList);
        },
        getCurrentCount: function(){
        	if (localStorage.activityList) {
        		return JSON.parse(localStorage.activityList).length;
        	}else{
        		return 0;
        	}	
        },
        getMaxId: function(){
			var data = JSON.parse(localStorage.activityList);
			console.log(data);
        	var id = 0;
        	$.each(data, function(index, value) {
        		if (id < value.id){
        			id = value.id;
        		}
        	});
        	//id = id+1;
        	return ++id;
        },
        clearAll: function(){
        	localStorage.activityList = JSON.stringify([]);
        },
        deleteById: function(id){
        	var data = JSON.parse(localStorage.activityList);
        	$.each(data, function(index, value) {
    			if(value != null){
    				if(value.id == id){
    					console.log('delete: '+id);
    					data.splice(index,1);
    				}
    			}
			});
			console.log(JSON.stringify(data));
			localStorage.activityList = JSON.stringify(data);
        }
	};
	var octopus = {
		addNewActivity: function(name, place, date, desc) {
            model.add({
                id: model.getMaxId(),
                name: name,
                place: place,
                date: date,
                desc: desc
            });
            view.render();
        },

        getActivities: function() {
            return model.getAllNotes();
        },
        deleteActivities: function(){
        	model.clearAll();
        	view.render();
        },
        deleteActivityById: function(id){
        	model.deleteById(id);
        	view.render();
        },
        init: function() {
              model.init();
              view.init();
        }
	};
	var view = {
		init: function() {
            this.noteList = $('#act-list');
            this.addButton = $('.add-act');
            this.clearButton = $('.clear-act');

            var textName = $('.act-name');
            var textPlace = $('.act-place');
            var textDate = $('.act-date');
            var textDesc = $('.act-desc');

            this.displayArea = $('.act-list');

            this.displayArea.on('click','.delete_btn', function(){
            	//alert('delete id: '+$(this).attr('id'));
            	octopus.deleteActivityById($(this).attr('id'));
            });

            this.addButton.click(function(){
            	octopus.addNewActivity(textName.val(), textPlace.val(), textDate.val(), textDesc.val());
            });
            this.clearButton.click(function(){
            	octopus.deleteActivities();
            });

            view.render();
        },

        render: function(){
            var htmlStr = '';
            octopus.getActivities().forEach(function(note){
                htmlStr += '<div class="note" id="note_'+note.id+'">'+
                        note.id+". "+note.name +"<br />"+note.place+"<br />"+note.date+"<br />"+note.desc+
                    '<br /><span class="delete_btn" id="'+note.id+'">delete</span></div>';
            });
            this.noteList.html(htmlStr);
        }
	};

	octopus.init();

}());


