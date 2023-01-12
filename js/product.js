const { createApp } = Vue;

createApp({
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            api_path: "yu_",
            token: "",
            products:{},
            detail:{}
        }
    },
    methods: {
        loginCheck() {
            //取得cookie當中的token
            let token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            //將token設定為每次發送請求都會自動放入header當中
            axios.defaults.headers.common['Authorization'] = token;
            //處理如果取不到token就導向登入頁面
            axios.post(`${this.url}/api/user/check`)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        this.getProductData()
                    }else{
                        alert("請重新登入");
                        location.href = "./index.html"
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // alert("請重新登入");
                    // location.href = "./index.html"
                })
        },
        getProductData() {
            axios.get(`${this.url}/api/${this.api_path}/admin/products/all`)
            .then((res)=>{
                console.log(res);
                this.products=Object.values(res.data.products);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    mounted() {
        this.loginCheck()
    }
}).mount("#app")
