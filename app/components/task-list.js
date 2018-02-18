import Component from '@ember/component';
import { filterBy } from '@ember/object/computed';
import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Component.extend({
  pendingTasks: filterBy('list.tasks', 'isNew'),

  store: service(),

  actions: {
    addTask() {
      let task = this.get('store').createRecord('task', {
        description: 'new task',
        list: this.get('list')
      });
      next(() => task.save());
    }
  }
});
