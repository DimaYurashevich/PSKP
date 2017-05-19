var jwt = require('jsonwebtoken');
module.exports = (permissions, err, config ) => {
    return (req, res, next) => {
        console.log(permissions[req.url]);
        src=permissions[req.url][req.method];
        if(src!=undefined)
        {
            if(src.length==0)
                next();
            else
            {
                return getRole(req.cookies["x-access-token"],err,config)
                .then(data=>checkRole(data.__user_role, src))
                .then(data=>next())
                .catch(error=>res.json({succses:false, message: error}));
            }
        }
        else
        {
            res.json({succses: false,
            message: "error url"});
        }
    }
};
function getRole(cookes,err,config)
{ 
    console.log("??????");
    return new Promise((resolve, reject) => {
        if(cookes==undefined) return reject("not cookies");
        jwt.verify(cookes, config["jwt_key"], function (err, decoded)
        {
            if(err)
            {
                console.log("err");
                return reject("Error cookes");
            }
            else{
                console.log("ww");
                return resolve(decoded);
            }
        })
    })
}
function checkRole(role, srcRole)
{
    return new Promise((resolve, reject) => {
        role.forEach((element)=>{
            if(srcRole.indexOf(element)!=-1)
            {
                return resolve(element);
            }
        });
        return reject("access denied");
    });
}