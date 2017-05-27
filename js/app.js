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
        clearAll: function(){
        	localStorage.activityList = JSON.stringify([]);
        }
	};
	var octopus = {
		addNewActivity: function(name) {
            model.add({
                id: model.getCurrentCount()+1,
                name: name
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
            var newActivity = $('.act-name');
            
            this.addButton.click(function(){
            	octopus.addNewActivity(newActivity.val());
            });
            this.clearButton.click(function(){
            	octopus.deleteActivities();
            });

            view.render();
        },

        render: function(){
            var htmlStr = '';
            octopus.getActivities().forEach(function(note){
                htmlStr += '<li class="note" id="note_'+note.id+'">'+
                        note.id+". "+note.name +
                    '</li>';
            });
            this.noteList.html(htmlStr);
        }
	};

	octopus.init();

}());


