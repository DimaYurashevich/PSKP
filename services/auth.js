module.exports = (userRepository,roleRepository,facultyRepository, errors) => {
    /*user=UserService(userRepository,errors);
    faculty=FacultyService(facultyRepository,errors);*/
    return {
        login: login
        
    };
    function login(data)
    {
        userRepository.findById(data.login,).then(userRez=>{
            console.log(userRez);
        });
    }

/*

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
    return new UserService(userRepository, errors);
};