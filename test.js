const iq = require('./index');
var email = process.env.EMAIL, pass = process.env.PASS;
const option = new iq(email, pass);
console.log(email)
option.login(email, pass).then(rest => {
    rest = JSON.parse(rest)
    //console.log(rest)
    option.checkSession(rest.ssid).then(ch => {
        console.log(ch)
        option.ws.handle(test => {
            console.log(test)
        });
    })
}).catch(e => {
    console.log(e.data)
})


/* option.events([{"category":"system","name":"microservice","uuid":"c835e31e-9287-4195-9b3f-e3d1f7e585a1","active_session_uuid":"16364729-56fa-422f-ea14-e2e286341fee","connection_hash":"4362684273272866389","user_id":65791579,"group_id":193,"platform_id":9,"app_version":"2073.1.0693.release","device_id":"eecbfa425dee05d1df82e8fee9490df1","sync_time":1614214871750,"client_time":1614214870684,"technical_logs":true,"parameters":{"count_error":"0","count_request":"68","endpoint":"iqoption.com","feature":"","front":"ws07b.prod.ws.wz-ams","percent":"100","type":"history-quotes"}},{"category":"system","name":"microservice","uuid":"6aaf3d9f-0dd4-4232-b246-6261851d1adb","active_session_uuid":"16364729-56fa-422f-ea14-e2e286341fee","connection_hash":"4362684273272866389","user_id":65791579,"group_id":193,"platform_id":9,"app_version":"2073.1.0693.release","device_id":"eecbfa425dee05d1df82e8fee9490df1","sync_time":1614214871750,"client_time":1614214870684,"technical_logs":true,"parameters":{"count_error":"0","count_request":"68","endpoint":"iqoption.com","feature":"","front":"ws07b.prod.ws.wz-ams","percent":"100","type":"quotes"}}]).then(app => {
    console.log(app)
}).catch(e => {
    console.log(e)
}) */