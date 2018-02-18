import { module, test } from 'qunit';
import { click, findAll, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | list', function(hooks) {
  setupApplicationTest(hooks);

  test('add task', async function(assert) {
    server.create('list');
    assert.expect(2);

    server.post('/tasks', function({ tasks }) {
      assert.equal(findAll('.pending-tasks li').length, 1, 'newly-added task displays as "pending"');

      return tasks.create(this.normalizedRequestAttrs());
    });

    await visit('/');
    await click('button');

    assert.equal(findAll('.pending-tasks li').length, 0, 'after save, task no longer displays as pending');
  });
});
