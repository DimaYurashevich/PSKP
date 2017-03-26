module.exports = (facultyRepository, errors) => {
    const BaseService = require('./base');

    Object.setPrototypeOf(FacultyService.prototype, BaseService.prototype);

    function PostService(facultyRepository, errors) {
        BaseService.call(this, facultyRepository, errors);

        var self = this;

        self.create = create;
        self.update = update;

        function create(data) {
            return new Promise((resolve, reject) => {
                var faculty = {
                    name: data.name,
                    fullName: data.fullName
                };

                self.baseCreate(faculty)
                    .then(resolve).catch(reject);
            });
        }

        function update(id, data){
            return new Promise((resolve, reject) => {
                var faculty = {
                    name: data.name,
                    fullName: data.fullName
                };

                self.baseUpdate(id, faculty)
                    .then(resolve).catch(reject);
            });
        }

    }

    return new FacultyService(facultyRepository, errors);
};