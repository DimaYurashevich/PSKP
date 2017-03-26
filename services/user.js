module.exports = (userRepository, errors) => {
    const BaseService = require('./base');

    Object.setPrototypeOf(UserService.prototype, UserService.prototype);

    function PostService(userRepository, errors) {
        BaseService.call(this, userRepository, errors);

        /*let self = this;

        self.create = create;
        self.update = update;

        function create(data) {
            return new Promise((resolve, reject) => {
                let group = {
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
                let group = {
                    course: data.course,
                    group: data.group,
                    subgroup: data.subgroup 
                };

                self.baseUpdate(id, group)
                    .then(resolve).catch(reject);
            });
        }*/

    }

    return new UserService(userRepository, errors);
};