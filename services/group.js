module.exports = (groupRepository, errors) => {
    const BaseService = require('./base');

    Object.setPrototypeOf(GroupService.prototype, BaseService.prototype);

    function PostService(groupRepository, errors) {
        BaseService.call(this, groupRepository, errors);

        var self = this;

        self.create = create;
        self.update = update;

        function create(data) {
            return new Promise((resolve, reject) => {
                var group = {
                    course: data.course,
                    group: data.group,
                    subgroup: data.subgroup 
                };

                self.baseCreate(group)
                    .then(resolve).catch(reject);
            });
        }

        function update(id, data){
            return new Promise((resolve, reject) => {
                var group = {
                    course: data.course,
                    group: data.group,
                    subgroup: data.subgroup 
                };

                self.baseUpdate(id, group)
                    .then(resolve).catch(reject);
            });
        }

    }

    return new GroupService(groupRepository, errors);
};