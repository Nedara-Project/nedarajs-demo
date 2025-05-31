"use strict";

import Nedara from './lib/nedarajs/nedara.js';

// Initialize the app when DOM is ready
$(document).ready(async function () {
    // Import templates
    await Nedara.importTemplates('templates/tasks.html');

    // Create task manager widget
    const taskApp = Nedara.createWidget({
        selector: '#task-app',
        events: {
            'submit .new-task-form': '_onAddTask',
            'click .filter-btn': '_onFilterTasks',
            'click [data-js-function]': '_fnTrigger',
        },

        start: function () {
            this.tasks = [];
            this.currentFilter = 'all';
            this.nextId = 1;

            // Load saved tasks
            this._loadTasks();

            // Initial render
            this._renderApp();
        },

        _loadTasks: function () {
            try {
                const saved = localStorage.getItem('nedara-tasks');
                if (saved) {
                    const data = JSON.parse(saved);
                    this.tasks = data.tasks || [];
                    this.nextId = data.nextId || 1;
                }
            } catch (e) {
                console.error('Error loading tasks:', e);
            }
        },

        _saveTasks: function () {
            try {
                localStorage.setItem('nedara-tasks', JSON.stringify({
                    tasks: this.tasks,
                    nextId: this.nextId,
                }));
            } catch (e) {
                console.error('Error saving tasks:', e);
            }
        },

        _onAddTask: function (ev) {
            ev.preventDefault();

            const form = ev.currentTarget;
            const formData = new FormData(form);

            const title = formData.get('title').trim();
            if (!title) {
                return;
            };

            const task = {
                id: this.nextId++,
                title: title,
                description: formData.get('description').trim() || '',
                priority: formData.get('priority') || 'medium',
                dueDate: formData.get('dueDate') || '',
                completed: false,
                createdAt: new Date().toLocaleDateString('en-US'),
            };

            this.tasks.unshift(task);
            this._saveTasks();

            // Reset form
            form.reset();

            // Re-render
            this._renderApp();
        },

        _onFilterTasks: function (ev) {
            ev.preventDefault();

            // Update active buttons
            this.$selector.find('.filter-btn').removeClass('active');
            $(ev.currentTarget).addClass('active');

            // Update filter
            this.currentFilter = $(ev.currentTarget).data('filter');

            // Re-render
            this._renderApp();
        },

        _onCompleteTask: function (ev) {
            const taskId = parseInt($(ev.currentTarget).closest('.task-item').data('taskId'));
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = true;
                this._saveTasks();
                this._renderApp();
            }
        },

        _onUncompleteTask: function (ev) {
            const taskId = parseInt($(ev.currentTarget).closest('.task-item').data('taskId'));
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = false;
                this._saveTasks();
                this._renderApp();
            }
        },

        _onDeleteTask: function (ev) {
            const taskId = parseInt($(ev.currentTarget).closest('.task-item').data('taskId'));

            if (confirm('Are you sure you want to delete this task?')) {
                this.tasks = this.tasks.filter(t => t.id !== taskId);
                this._saveTasks();
                this._renderApp();
            }
        },

        _getFilteredTasks: function () {
            switch (this.currentFilter) {
                case 'completed':
                    return this.tasks.filter(t => t.completed);
                case 'pending':
                    return this.tasks.filter(t => !t.completed);
                case 'high':
                    return this.tasks.filter(t => t.priority === 'high');
                default:
                    return this.tasks;
            }
        },


        _prepareTasksForTemplate: function (tasks) {
            return tasks.map(task => ({
                ...task,
                priorityHigh: task.priority === 'high',
                priorityMedium: task.priority === 'medium',
                priorityLow: task.priority === 'low',
                dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US') : '',
            }));
        },

        _renderApp: function () {
            const filteredTasks = this._getFilteredTasks();
            const preparedTasks = this._prepareTasksForTemplate(filteredTasks);

            const templateData = {
                tasks: preparedTasks,
                empty: !preparedTasks.length,
                totalTasks: this.tasks.length,
                completedTasks: this.tasks.filter(t => t.completed).length,
                pendingTasks: this.tasks.filter(t => !t.completed).length,
            };

            const html = Nedara.renderTemplate('task_app', templateData);
            this.$selector.html(html);
        },
    });

    // Register the widget
    Nedara.registerWidget('taskApp', taskApp);

    console.log('🚀 Task Manager app initialized with Nedara JS!');
});
