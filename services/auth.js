module.exports = (userRepository,roleRepository,facultyRepository, errors) => {
    /*user=UserService(userRepository,errors);
    faculty=FacultyService(facultyRepository,errors);*/
    return {
        login: login,
        registrationDean: registrationDean,
        registrationTeacher: registrationTeacher
        
    };
    function registrationDean(data)
    {
        rez={success:""};
        userRepository.findById(data.login)
        .then(userRez=>{
            if(userRez==null){
                 return userRepository.create({
                    login: data.login,
                    password: data.password,
                    surname: data.surname,
                    firstname: data.firstname,
                    patronymic: data.patronymic
                })
            }
            else
                throw ({error: "User already exists"});
        })
        .then(user=>{
            return new Promise((resolve, reject) => {
                Promise.all([
                    user.addRole("dean"),
                    user.addRole("teacher")
                    ]).then((rez)=>resolve(user.login))
            })
        })
        .then(login=>{
            facultyRepository.create({name: data.facultyName,
                                    fullName: data.facultyFullName,
                                    userLogin: login})
        })
        .then(()=>{rez.success="true"})
        .catch(err=> {console.log(err); rez.success= "false";
        });
        return rez;
    }
    function registrationTeacher(data)
    {
        userRepository.findById(data.login)
        .then(userRez=>{
            if(userRez==null){
                 return userRepository.create({
                    login: data.login,
                    password: data.password,
                    surname: data.surname,
                    firstname: data.firstname,
                    patronymic: data.patronymic
                })
            }
            else
                throw ({error: "User already exists"});
        })
        .then(user=>{
            return user.addRole("dean")
        })
        .then(()=>{rez= ({success: "true"})})
        .catch(err=> {console.log(err); rez=({success: "false"})
        });
        return rez;
    }
    function login(data){
        return null;
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